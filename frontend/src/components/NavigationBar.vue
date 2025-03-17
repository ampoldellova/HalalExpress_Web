<script setup lang="ts">
import logo from "../assets/icon.png";
</script>

<template>
  <div
    style="
      justify-content: space-between;
      flex-direction: row;
      display: flex;
      align-items: center;
      width: 100%;
      align-self: start;
    "
  >
    <div style="display: flex">
      <el-image
        style="width: 40px; height: 40px; object-fit: cover"
        :src="logo"
      />
      <el-text
        style="
          font-family: bold;
          font-size: x-large;
          margin-left: 10px;
          color: #30b9b2;
          margin-left: 10px;
        "
      >
        HalalExpress
      </el-text>
    </div>

    <div style="align-items: center; display: flex">
      <el-button
        style="
          background-color: #30b9b2;
          color: white;
          text-transform: none;
          font-family: regular;
        "
      >
        Login
      </el-button>
      <el-button
        style="
          border-color: #30b9b2;
          text-transform: none;
          font-family: regular;
          color: #30b9b2;
        "
        >Register</el-button
      >
      <el-icon style="color: #30b9b2; font-size: 30px; margin-left: 10px"
        ><ShoppingBag
      /></el-icon>
    </div>
  </div>
</template>

<style scoped></style>
