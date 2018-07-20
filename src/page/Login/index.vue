<style lang="less" scoped src="./index.less" ></style>

<template>
  <div class='crad'>
    <div>
      <div class='title' :class="submitForm.sex==1||submitForm.sex==0? 'male' : 'female' ">
        <div class='background-image'>
          <div class='title-block'>
            <div class='img' v-if='submitForm.head_img' :style="{backgroundImage: 'url(' + base+submitForm.head_img +')'}"></div>
            <div class='img' v-else :style="{backgroundImage: 'url(' + defaultAvatar + ')'}"></div>
          </div>
          <div class='background'>
            <img class='blue-icon' v-if='submitForm.sex==1||submitForm.sex==0' src='../../assets/images/label@2x.png' />
            <img class='blue-icon' v-else src='../../assets/images/label@2x2.png' />

            <img class='gender' v-if='submitForm.sex==1||submitForm.sex==0' src='../../assets/images/man_2@2x.png' />
            <img class='gender' v-else src='../../assets/images/girl_2@2x.png' />

            <div class='pos-text'>{{submitForm.name}}</div>
          </div>
          <div class='text-top'>
            <div class='text'>
              <span>云算编号：{{submitForm.account}}</span>
              <span class='right'>电话号码：{{submitForm.tel}}</span>
            </div>
            <div class='text but'>
              <span>任职公司：{{submitForm.company_name}}</span>
              <span class='right'>入职年限：{{getYearLimit(submitForm.create_time)}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class='bottom'>
        <span class='code'>
          <img class='code-img' src='../../assets/images/erweima.png' />
        </span>
        <span class='download'>
          <div class='bottom-text'>想要了解更多经纪人信息<br/> 下载云算APP！</div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
let defaultAvatar = require("../../assets/images/def_head@2x.png");
export default {
  data() {
    return {
      defaultAvatar: defaultAvatar,
      submitForm: {
        name: "",
        account: "",
        create_time: "",
        company_name: "",
        tel: "",
        sex: ""
      }
    };
  },

  mounted() {
    this.getShare();
  },
  methods: {
    async getShare() {
      let id = this.$route.query.agent_id;
      let res = await this.api.getShare({ id: id });
      if (res.code == 200) {
        this.submitForm = res.data;
      }
    },
    getYearLimit(create_time_str) {
      if (!this.submitForm.create_time) return;
      
      let dateStr = create_time_str.split(" ")[0];
      let dateArr = dateStr.split("-");
      let create_time = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
      let nowTime = new Date();
      let nowDate = new Date(
        nowTime.getFullYear(),
        nowTime.getMonth(),
        nowTime.getDate()
      );
      //计算时间跨度
      let distance = nowDate.getTime() - create_time.getTime();
      let result = "";
      let year = Number.parseInt(distance / 1000 / 60 / 60 / 24 / 365); //转整
      if (year > 0) {
        result += year + "年";
      }

      let month = Number.parseInt(distance / 1000 / 60 / 60 / 24 / 30);
      if (month > 0) {
        let month_dist = month - year * 12;
        result += month_dist + "个月";
      }

      return result;
    },
    sex(row) {
      if (row.sex == 2) {
        return "女";
      } else if (row.sex == 1) {
        return "男";
      } else {
        return "未设置";
      }
    }
  }
};
</script>



