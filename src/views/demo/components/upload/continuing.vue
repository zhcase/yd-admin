<!--
 * @Author: zeHua
 * @Date: 2021-10-14 13:58:39
 * @LastEditors: zeHua
 * @LastEditTime: 2021-10-18 17:34:42
 * @FilePath: /yd-admin/src/views/demo/components/upload/continuing.vue
-->
<template>
  <div>
    <el-button type="primary" @click="handleClicklDownload(1)" v-if="btnStatus"
      >下载</el-button
    >
    <el-button type="primary" @click="handleClicklStop" v-if="!btnStatus"
      >暂停</el-button
    >

    <el-progress :percentage="percentage"></el-progress>
  </div>
</template>

<script>
import { download } from "@/api/user.js";
export default {
  data() {
    return {
      downloadStatus: 1,
      percentage: 0, //进度条
      totalNum: 0,
      btnStatus: true,
      totalBlob: [],
      downloadProcess: [0, 512000], // 文件当前下载进度
    };
  },
  methods: {
    handleClicklStop() {
      //   this.downloadStatus = 1;
      this.downloadStatus = 0;
      this.btnStatus = true;
    },
    async handleClicklDownload(args) {
      if (args) {
        this.btnStatus = false;
      }
      if (!this.downloadStatus) {
        return;
      }
      //   this.downloadStatus = 1;

      // 用当前进度获取下次文件流
      let result = await download(this.downloadProcess.join("-"));
      console.log(result);
      // 获取当前达到的进度
      this.downloadProcess[0] = Number(result.headers["content-length"]);
      this.downloadProcess[1] =
        Number(result.headers["content-length"]) + 512000;

      console.log(result.headers["content-length"]);
      //获取总数据大小
      this.totalNum = Number(result.headers["file-size"]);
      //   console.log(this.downloadProcess);
      // 进度条百分比 保留2位小数
      this.percentage = Number(
        ((this.downloadProcess[0] / this.totalNum) * 100).toFixed(2)
      );
      if (
        this.downloadProcess[0] === this.totalNum ||
        this.downloadProcess[0] > this.totalNumf
      ) {
        this.percentage = 100;
      } else {
        // console.log(result.data);
        this.totalBlob.push(result.data);
        this.handleClicklDownload();
        // if (this.downloadProcess === 1024) {
        //   //   var url = window.URL.createObjectURL(blob);
        //   const blob = new Blob(this.totalBlob);
        //   const link = document.createElement("a"); //创建a标签
        //   link.download = "hello.zip";
        //   link.style.display = "none";
        //   link.href = URL.createObjectURL(blob);
        //   document.body.appendChild(link);
        //   link.click(); //执行下载
        //   URL.revokeObjectURL(link.href); //释放url
        //   document.body.removeChild(link); //释放标签
        // }
        console.log(this.totalBlob);
      }
      //   console.log(blob);
    },
  },
};
</script>
