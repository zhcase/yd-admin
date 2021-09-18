<!--
 * @Author: zeHua
 * @Date: 2021-09-17 09:32:35
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-18 18:09:16
 * @FilePath: /yd-admin/src/views/demo/components/tree/basicTree.vue
-->
<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>默认展开</span>
        </div>
        <div class="text item">
          <basic-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="[2, 3]"
          ></basic-tree>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>可勾选默认展开</span>
        </div>
        <div class="text item">
          <basic-tree
            :data="data"
            default-expand-all
            ref="tree"
            show-checkbox
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="[2, 3]"
          ></basic-tree>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>懒加载</span>
        </div>
        <div class="text item">
          <!-- <basic-tree
            :props="prop"
            :load="loadNode"
            lazy
            show-checkbox
          ></basic-tree> -->
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>可勾选默认展开</span>
        </div>
        <div class="text item">
          <tree-select
            :data="TreeSelectData"
            default-expand-all
            show-checkbox
            @getTreeValue="getTreeValue"
            :props="defaultProps"
            ref="tree"
            :multiple="true"
            lazy
            :load="loadNode"
            node-key="orgId"
            :format="['orgId', 'superiorId']"
            :default-expanded-keys="[2, 3]"
          ></tree-select>
        </div>
      </el-card>
    </el-col>
    <el-button type="primary" @click="handleClick">tree</el-button>
  </el-row>
</template>

<script>
import { BasicTree, TreeSelect } from '@/components/Tree/index.js';
import { getTreeList, getUserTree } from '@/api/user.js';
export default {
  name: 'baseTree',
  components: {
    BasicTree,
    TreeSelect,
  },
  data() {
    return {
      method: null,
      node: [],
      resolve: null,
      prop: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf',
      },
      TreeSelectData: [],
      defaultProps: {
        value: 'orgId',
        label: 'orgName',
        children: 'children',
      },
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1',
            },
            {
              id: 6,
              label: '二级 2-2',
            },
          ],
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1',
            },
            {
              id: 8,
              label: '二级 3-2',
            },
          ],
        },
      ],
    };
  },

  methods: {
    handleExpand(val) {
      // console.log(val);
      // console.log(this.node);
    },
    getTreeValue(val) {
      console.log(val);
    },
    handleClick() {
      console.log(this.$refs.tree.method.getCheckedNodes());
    },
    loadNode(node, resolve, data) {
      this.resolve = resolve;

      if (node.level > 0 && node.level < 3) {
        //默认展开的层级,需要默认几层就判断一下.
        return resolve(node.data.children); //核心是这里,每次展开的时候loadNode方法就会调用一次,只需要把node.data.[这里是默认的child字段]  加载到resolve方法里就可以了.就可以实现默认加载N级,之后再使用懒加载
      } else {
        console.log(node);
        if (node.data && node.data.children === 0) {
          getUserTree(node.data.orgId).then((res) => {
            // val.children = res.data;
            // this.$set(val, 'children', res.data);
            // console.log(val);
            // console.log(this.node);
            // this.loadNode(this.node, this.resolve, res.data);
            // resolve(res.data);
          });
        } else {
          if (node.data && node.data.length > 0) {
            return resolve(node.data.children);
          }
        }
      }

      // if (node.level > 1) return resolve([]);
      // setTimeout(() => {
      //   if (node.data.children) {
      //     node.data.children.isLeaf = false;
      //     resolve(node.data.children);
      //   } else {
      //     console.log(node.data.children);
      //     resolve([]);
      //   }
      // }, 500);
    },
  },
  created() {
    getTreeList().then((res) => {
      this.TreeSelectData = res.data;
    });
  },
  mounted() {
    // this.TreeSelectData=
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  .item {
    height: 400px;
  }
}
</style>
