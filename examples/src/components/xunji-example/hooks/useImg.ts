import img1 from "../../../assets/img/img (1).png";
import img2 from "../../../assets/img/img (2).png";
import img3 from "../../../assets/img/img (3).png";
import img4 from "../../../assets/img/img (4).png";
import img5 from "../../../assets/img/img (5).png";
import img6 from "../../../assets/img/img (6).png";
const imgList = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  "https://pic.imgdb.cn/item/65c1fec99f345e8d03a4d7b4.jpg",
  "https://pic.imgdb.cn/item/65c1ff5d9f345e8d03a66b58.jpg",
];

// for (let i = 1; i <= 211; i++) {
//     imgList.push(`http://127.0.0.1:9000/img?index=${i}`);
// }

export default function useImg() {
  return {
    imgList,
  };
}
