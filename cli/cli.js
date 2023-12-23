import prompts from 'prompts';
import fs from 'fs';
import path from 'path';

// 定义模板类型
const templateTypes = ['Vue', 'TSX', 'JSX'];

// 定义提示选项
const promptsOptions = [
    {
        type: 'text',
        name: 'componentNameEn',
        message: '请输入组件英文名字'
    },
    {
        type: 'text',
        name: 'componentNameZh',
        message: '请输入组件中文名字'
    },
    {
        type: 'select',
        name: 'templateType',
        message: '请选择模板类型',
        choices: templateTypes.map((type) => ({ title: type, value: type }))
    }
];

// 中断标志
let isInterrupted = false;

// 处理中断信号
process.on('SIGINT', () => {
    console.log('\n用户中断，取消创建。');
    isInterrupted = true;
    process.exit(1);
});

// 创建组件文件
const createComponentFiles = (
    componentNameEn,
    componentNameZh,
    templateType
) => {
    const basePath = path.resolve(process.cwd(), 'packages/components/src');
    const folderName = path.resolve(basePath, componentNameEn);

    if (createFolder(folderName)) {
        updateIndexFile(basePath, componentNameEn, componentNameZh);
        createTemplateFiles(folderName, componentNameEn, templateType);
        createTestFiles(folderName, componentNameEn, templateType);
        createComponentIndexFile(folderName, componentNameEn);
        createComponentDocs(componentNameEn,folderName);
        // 创建组件 Less 文件
        createComponentLess(componentNameEn);
        // 更新 components/index.less
        updateComponentsLess(componentNameEn);
    }
};

// 更新 index.ts 文件
const updateIndexFile = (basePath, componentNameEn, componentNameZh) => {
    const indexFilePath = path.resolve(basePath, 'index.ts');
    const indexContent = `\n// 导入${componentNameZh}\nexport * from "./${componentNameEn}";`;

    if (!isInterrupted && fs.existsSync(indexFilePath)) {
        const currentIndexContent = fs.readFileSync(indexFilePath, 'utf-8');

        if (currentIndexContent.includes(`// 导入${componentNameZh}`)) {
            console.log(
                `错误：文件 ${indexFilePath} 中已经存在导入${componentNameZh}的语句。`
            );
            return;
        }
    }

    fs.appendFileSync(indexFilePath, indexContent);
    console.log(`文件 ${indexFilePath} 更新成功`);
};
//创建模板
const createTemplateFiles = (folderName, componentNameEn, templateType) => {
    const templateFolder = `${folderName}/template`;
    createFolder(templateFolder);

    let fileExtension, templateContent;

    switch (templateType) {
        case 'Vue':
            fileExtension = 'vue';
            templateContent = `<template>
  <div class="se-${componentNameEn}" :class="${componentNameEn}Style"><slot /></div>
</template>

<script lang="ts" setup>
import '../../less/components/${componentNameEn}/index.less'
import { computed } from "vue";
defineOptions({ name: "se-${componentNameEn}" });
type ${componentNameEn}Props = {
  type?: string;
};
const ${componentNameEn}Props = defineProps<${componentNameEn}Props>();

const ${componentNameEn}Style = computed(() => {
  return { ["se-${componentNameEn}--" + ${componentNameEn}Props.type]: ${componentNameEn}Props.type };
});
</script>`;
            break;
        case 'TSX':
            fileExtension = 'tsx';
            templateContent = `import { defineComponent, computed, VNode } from "vue";
import '../../less/components/${componentNameEn}/index.less'
export default defineComponent({
  name: "se-${componentNameEn}",
  props: {
    type: String
  },
  setup(props, { slots }): () => VNode {
    const ${componentNameEn}Style = computed(() => {
      return props.type ? { ["se-${componentNameEn}--" + props.type]: true } : {};
    });
    return () => (
          <div class={\`se-${componentNameEn} \${${componentNameEn}Style.value ? Object.keys(${componentNameEn}Style.value).join(' ') : ''}\`}>
        {slots.default && slots.default()}
      </div>
    );
  }
});

                `;
            break;
        case 'JSX':
            fileExtension = 'jsx';
            templateContent = `
import {  defineComponent, computed } from "vue";
import '../../less/components/${componentNameEn}/index.less';

export default defineComponent({
  name: "se-${componentNameEn}",
  props: {
    type: String
  },
  setup(props, { slots }) {
    const ${componentNameEn}Style = computed(() => {
      return props.type ? { ["se-${componentNameEn}--" + props.type]: true } : {};
    });

    return () => (
       <div class={\`se-${componentNameEn} \${${componentNameEn}Style.value ? Object.keys(${componentNameEn}Style.value).join(' ') : ''}\`}>
        {slots.default && slots.default()}
      </div>
    );
  }
});`;
            break;
        default:
            console.error('未知的模板类型');
            return;
    }

    const templateFilePath = `${templateFolder}/${componentNameEn}.${fileExtension}`;

    createFile(
        templateFilePath,
        templateContent,
        `文件 ${templateFilePath} 创建成功`
    );
};

// 创建 test 文件夹和 .test.ts 文件
const createTestFiles = (folderName, componentNameEn, templateType) => {
    const testFolder = `${folderName}/test`;
    createFolder(testFolder);

    let testContent, testFilePath;

    switch (templateType) {
        case 'Vue':
            testContent = `import { mount } from '@vue/test-utils';
import ${componentNameEn} from '../template/${componentNameEn}.vue';
import { describe, expect, it } from 'vitest';
describe('${componentNameEn} Test', () => {
  it('renders component properly', () => {
    const wrapper = mount(${componentNameEn});
    // Add your test logic here
  });
});`;
            testFilePath = `${testFolder}/${componentNameEn}.test.ts`;
            break;
        case 'TSX':
            testContent = `import { mount } from '@vue/test-utils';
import ${componentNameEn} from '../template/${componentNameEn}';
import { describe, expect, it } from 'vitest';
describe('${componentNameEn} Test', () => {
  it('renders component properly', () => {
    const wrapper = mount(${componentNameEn});
    // Add your test logic here
  });
});`;
            testFilePath = `${testFolder}/${componentNameEn}.test.ts`;
            break;
        case 'JSX':
            testContent = `import { mount } from '@vue/test-utils';
import ${componentNameEn} from '../template/${componentNameEn}';
import { describe, expect, it } from 'vitest';
describe('${componentNameEn} Test', () => {
  it('renders component properly', () => {
    const wrapper = mount(${componentNameEn});
    // Add your test logic here
  });
});`;
            testFilePath = `${testFolder}/${componentNameEn}.test.ts`;
            break;
        default:
            console.error('未知的模板类型');
            return;
    }

    createFile(testFilePath, testContent, `文件 ${testFilePath} 创建成功`);
};

// 创建 index.ts 文件
const createComponentIndexFile = (folderName, componentNameEn) => {
    const componentIndexContent = `import _${componentNameEn} from "./template/${componentNameEn}.vue";\nimport type { App, Plugin } from "vue";\ntype SFCWithInstall<T> = T & Plugin;\nconst withInstall = <T>(comp: T) => {\n  (comp as SFCWithInstall<T>).install = (app: App) => {\n    const name = (comp as any).name;\n    // 注册组件\n    app.component(name, comp as SFCWithInstall<T>);\n  };\n  return comp as SFCWithInstall<T>;\n};\nexport const ${componentNameEn} = withInstall(_${componentNameEn});\nexport default ${componentNameEn};`;
    const componentIndexFilePath = `${folderName}/index.ts`;

    createFile(
        componentIndexFilePath,
        componentIndexContent,
        `文件 ${componentIndexFilePath} 创建成功`
    );
};

// 创建文件函数
const createFile = (filePath, content, successMessage) => {
    if (!isInterrupted && !fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        console.log(successMessage);
    } else if (isInterrupted) {
        return;
    } else {
        console.log(`文件 ${filePath} 已存在`);
    }
};

// 创建组件 Less 文件
const createComponentLess = (componentNameEn) => {
    const basePath = path.resolve(process.cwd(), 'packages/components/src');
    const componentsLessPath = path.resolve(basePath, 'less/components');
    const componentLessPath = path.resolve(componentsLessPath, componentNameEn);

    const lessFolder = `${componentLessPath}`;
    createFolder(lessFolder);

    // 创建组件文件夹中的 index.less 文件
    const componentLessContent = `// Your component styles here
    @import url('../../base/index.less');
    `;

    const componentLessFilePath = `${lessFolder}/index.less`;
    if (!isInterrupted && !fs.existsSync(componentLessFilePath)) {
        fs.writeFileSync(componentLessFilePath, componentLessContent);
        console.log(`文件 ${componentLessFilePath} 创建成功`);
    } else if (isInterrupted) {
        return;
    } else {
        console.log(`文件 ${componentLessFilePath} 已存在`);
    }
};

// 更新 components/index.less 文件
const updateComponentsLess = (componentNameEn) => {
    const basePath = path.resolve(process.cwd(), 'packages/components/src');
    const componentsLessPath = path.resolve(
        basePath,
        'less/components/index.less'
    );
    const importStatement = `@import url('./${componentNameEn}/index.less');`;

    if (!isInterrupted && fs.existsSync(componentsLessPath)) {
        const currentComponentsLessContent = fs.readFileSync(
            componentsLessPath,
            'utf-8'
        );

        if (!currentComponentsLessContent.includes(importStatement)) {
            fs.appendFileSync(componentsLessPath, `\n${importStatement}`);
            console.log(`文件 ${componentsLessPath} 更新成功`);
        } else {
            console.log(`文件 ${componentsLessPath} 中已存在导入语句`);
        }
    }
};

// 创建文件夹函数
const createFolder = (folderName) => {
    if (isInterrupted) {
        return false;
    }

    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName, { recursive: true });
        console.log(`文件夹 ${folderName} 创建成功`);
        return true;
    } else {
        console.log(`文件夹 ${folderName} 已存在`);
        return false;
    }
};

// 将字符串的首字母大写
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// 更新 Vitepress 配置
const updateVitepressConfig = async (componentNameEn) => {
    const configPath = path.resolve(
        process.cwd(),
        'site/docs/.vitepress/config.js'
    );

    try {
        // 读取配置文件
        let configContent = fs.readFileSync(configPath, { encoding: 'utf-8' });

        // 在字符串中查找 //] 出现的位置
        const insertIndex = configContent.indexOf('//]');

        if (insertIndex !== -1) {
            // 构建新的组件项字符串
            const newItem = `{
                text: "${componentNameEn}",
                link: "/components/${componentNameEn.toLowerCase()}/"
            },\n\t//]`;

            // 检查组件是否已存在
            if (configContent.includes(`"${componentNameEn}"`)) {
                console.error(
                    `Vitepress 配置文件 ${configPath} 中已存在 ${componentNameEn} 的文档`
                );
                return;
            }

            // 插入新项
            configContent =
                configContent.slice(0, insertIndex) +
                newItem +
                configContent.slice(insertIndex + 3);

            // 写回配置文件
            await fs.writeFileSync(configPath, configContent, {
                encoding: 'utf-8'
            });
            console.log(`Vitepress 配置文件 ${configPath} 更新成功`);
        } else {
            console.error(`未找到匹配的位置`);
        }
    } catch (error) {
        console.error(`读取或写入文件时发生错误: ${error.message}`);
    }
};

// 创建组件文档
const createComponentDocs = (componentNameEn,folderName) => {
    const docsPath = path.resolve(
        process.cwd(),
        `site/docs/components/${componentNameEn.toLowerCase()}`
    );

    console.log(`尝试创建组件文档文件夹 ${docsPath}`);

    if (createFolder(docsPath)) {
        const indexContent = `# ${componentNameEn}${capitalizeFirstLetter(componentNameEn)}

这是 \`${capitalizeFirstLetter(componentNameEn)}\` (${folderName})组件的文档。
#### 示例
\`\`\`html
<se-${componentNameEn}>测试</se-${componentNameEn}> 
\`\`\`


### ${capitalizeFirstLetter(componentNameEn)}的基础配置

### ${componentNameEn} 参数

| 参数名      | 类型                       | 默认值 | 描述                                                                                | 跳转 Demo                                 |
| :---------- | :------------------------- | :----- | :---------------------------------------------------------------------------------- | :---------------------------------------- |
                                           

### 其他说明
`

        fs.writeFileSync(`${docsPath}/index.md`, indexContent);
        console.log(`组件文档文件夹 ${docsPath} 创建成功`);
    }
};

// 获取用户输入信息
const getUserInfo = async () => {
    const res = await prompts(promptsOptions);
    if (res.componentNameEn && res.componentNameZh && res.templateType) {
        createComponentFiles(
            res.componentNameEn,
            res.componentNameZh,
            res.templateType
        );

        await updateVitepressConfig(res.componentNameEn, res.componentNameZh);
    } else {
        console.log('输入不完整，取消创建。');
    }
};

// 调用函数开始执行
getUserInfo();
