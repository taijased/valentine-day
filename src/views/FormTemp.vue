<template lang="pug">
    el-dialog(title='Форма валентинки', :visible.sync='dialogFormVisible')
        el-form(label-position='left', :model='ruleForm', :rules="rules", status-icon, ref="ruleForm" )
            el-form-item(prop="fromWhom")
                el-input(v-model='ruleForm.fromWhom', placeholder="От кого", autocomplete="off")
            el-form-item(prop="forWhom")
                el-input(v-model='ruleForm.forWhom', placeholder="Для кого", autocomplete="off")
            el-form-item(prop="email")
              el-input(v-model='ruleForm.email', placeholder="email", autocomplete="off")
            el-form-item(prop="message")
              el-input(type="textarea", v-model="ruleForm.message")
            el-form-item(prop="checkbox")
                el-checkbox(v-model='ruleForm.checkbox', fill="#007f48", autocomplete="off", label='Согласен с обработкой персональных данных')
        span.dialog-footer(slot='footer')
            el-button(type='primary', @click='submitForm()') Отправить
</template>
<script>
import Api from "../api/Api.js";
import Validate from '../service/validate.js';

export default {
  name: "home",
  data() {
    return {
      dialogFormVisible: true,
      ruleForm: {
        forWhom: "",
        fromWhom: "",
        email: "",
        message: "",
        checkbox: false
      },
      rules: {
        forWhom: [{ validator: Validate.validateForWhom, trigger: "blur" }],
        fromWhom: [{ validator: Validate.validateFromWhom, trigger: "blur" }],
        email: [{ validator: Validate.validateEmail, trigger: "blur" }],
        message: [{ validator: Validate.validateMessage, trigger: "blur" }],
        checkbox: [{ validator: Validate.validateCheckBox, trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {

          // const idBoard = "5c35c65af44c5f13f13fcc65";
          // const idList = "5c35c68a3a95a04f8e7f0acd";
          // let description = `Форма: ${this.title}\n Имя: ${
          //   this.ruleForm.name
          // }\n Телефон: ${this.ruleForm.phone}\n E-mail: ${this.ruleForm.email}`;
          // let data = {
          //   name: `Запрос с сайта ${window.location.href}`,
          //   desc: description,
          //   idBoard: idBoard,
          //   idList: idList
          // };
          // new Promise((resolve, reject) => {
          //   ApiTrello.post("", data)
          //     .then(response => {
          //       this.dialogFormVisible = false;
          //       resolve(response);
          //     })
          //     .catch(error => {
          //       console.log(error);
          //       reject(error);
          //     });
          // });
        this.$router.push('/about')

        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  text-align: left;
}
</style>

