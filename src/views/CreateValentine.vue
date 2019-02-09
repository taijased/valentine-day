<template lang="pug">
  .creator
    .left-bar
      el-form(label-position='left', :model='ruleForm', :rules="rules", status-icon, ref="ruleForm", class="creator-form")
        el-form-item(prop="fromWhom", :class="{'not-empty': ruleForm.fromWhom !== ''}")
          el-input(v-model='ruleForm.fromWhom', autocomplete="off")
          .label *От кого
        el-form-item(prop="forWhom", :class="{'not-empty': ruleForm.forWhom !== ''}")
          el-input(v-model='ruleForm.forWhom', autocomplete="off")
          .label *Кому
        el-form-item(prop="email", :class="{'not-empty': ruleForm.email !== ''}")
          el-input(v-model='ruleForm.email', autocomplete="off")
          .label *E-mail
        el-form-item(prop="message", :class="{'not-empty': ruleForm.message !== ''}")
          el-input(type="textarea", v-model="ruleForm.message", maxlength="160")
          .label 
            span Текст поздравления 
            span(v-if="ruleForm.message !== '' && ruleForm.message.length !== 160") {{160 - ruleForm.message.length}}
        el-form-item(prop="checkbox")
          el-checkbox(v-model='ruleForm.checkbox', fill="#007f48", autocomplete="off", label='Согласен с обработкой персональных данных')
      .btn-primary(@click="submitForm()") {{$t("landing.btn")}}
    .right-bar
     Iphone
</template>
<script>
import AppHeader from "../components/Header";
import Iphone from "../components/Iphone";
import Api from "../api/Api.js";
import { mapGetters, mapActions } from "vuex";
import Api from '../api/Api.js';
export default {
  data() {
    var validateFromWhom = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Обязательное поле"));
      } else {
        if (value !== "" && value.length < 20) {
          this.setFromWhom(value);
          callback();
        } else {
          callback(new Error("Слишком длинное Имя"));
        }
      }
    };
    var validateForWhom = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Обязательное поле"));
      } else {
        if (value !== "" && value.length < 20) {
          this.setForWhom(value);
          callback();
        } else {
          callback(new Error("Слишком длинное Имя"));
        }
      }
    };
    var validateMessage = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Обязательное поле"));
      } else {
        if (value !== "" && value.length < 160) {
          new Promise((resolve, reject) => {
            const data = {
              form: this.ruleForm.fromWhom,
              to: this.ruleForm.forWhom,
              text: this.ruleForm.email,
              email: this.ruleForm.message,
            }
            Api.post('api.love.tim.agency/dvc', data)
              .then(response => {
                console.log(response);
                resolve(response)
              })
              .catch(reject)
          })
          callback();
        } else {
          callback(new Error("Слишком длинное Поздравление"));
        }
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Обязательное поле"));
      } else {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isTrue = re.test(value);
        if (!isTrue) {
          callback(new Error("Введите в формате. Пример: name@mail.ru"));
        } else {
          callback();
        }
      }
    };
    var validateCheckBox = (rule, value, callback) => {
      if (value === false) {
        callback(
          new Error("Пожалуйста согласитесь с пользовательским соглашением")
        );
      } else {
        callback();
      }
    };
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
        forWhom: [{ validator: validateForWhom, trigger: "blur" }],
        fromWhom: [{ validator: validateFromWhom, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        message: [{ validator: validateMessage, trigger: "blur" }],
        checkbox: [{ validator: validateCheckBox, trigger: "change" }]
      }
    };
  },
  methods: {
    ...mapActions({
      setFromWhom: "form/setFromWhom",
      setForWhom: "form/setForWhom",
      setText: "form/setText"
    }),
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log("valid");
        } else {
          return false;
        }
      });
    }
  },
  components: {
    AppHeader,
    Iphone
  }
};
</script>
<style lang="less">
@import url("../style/animation.less");

.creator {
  width: 100%;
  padding: 0 8%;
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #000;
  .left-bar {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .creator-form {
      width: 300px;
    }
  }
  .right-bar {
    margin-top: -250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .btn-primary {
    background: #9a0f20;
    border-radius: 15px;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    transition: color 0.3s, background 0.3s;
    font-family: TT Norms Regular;
    font-style: normal;
    font-weight: normal;
    line-height: 28px;
    font-size: 20px;
    letter-spacing: -0.75px;
    width: 300px;
    height: 70px;
    &:hover {
      color: #000;
      background: #fff;
      transition: color 0.3s, background 0.3s;
      cursor: pointer;
    }
  }
}

.el-input {
  input {
    margin: 0;
    border: 0;
    padding-left: 10px;
    padding-bottom: 5px;
    display: inline-block;
    vertical-align: middle;
    white-space: normal;
    background: none;
    line-height: 1;
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    transition: color @time-description, border-bottom @time-description;
    height: @input-height;
    width: 300px;
    // margin-top: -3px;
    line-height: 21px;
    font-size: 18px;
    border-radius: 0px;
    @media @xs {
      margin: 0;
      width: 90%;
    }
    &:focus,
    &:hover {
      outline: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 1);
    }
  }
  &__suffix {
    right: 0;
  }
}
.el-form-item {
  margin-bottom: 30px;
  font-family: TT Norms Medium;
  font-style: normal;
  font-weight: normal;
  color: #fff;
  textarea {
    resize: none;
    background: #000;
    border-top: none;
    border-left: none;
    border-right: none;
    height: 50px;
    width: 300px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 0px;
    color: #fff;
    padding-top: 15px;
    font-size: 18px;
    &:focus,
    &:hover {
      border-bottom: 1px solid rgba(255, 255, 255, 1);
    }
  }
  &:focus-within,
  &:hover {
    .label {
      font-size: @subtitle-size - 2;
      top: -5px;
      left: 0;
      transition: color @time-description, top @time-description,
        left @time-description, font-size @time-description;
      width: 300px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      @media @xs {
        left: 2.5%;
      }
    }
  }
  .label {
    height: 15px;
    color: white;
    position: absolute;
    top: 50%;
    left: 15px;
    font-family: TT Norms Light;
    font-style: normal;
    font-weight: normal;
    line-height: 16px;
    font-size: 14px;
    @media @xs {
      left: 5%;
      top: 14px;
    }
    transition: color @time-description, top @time-description,
      left @time-description, font-size @time-description;
    z-index: 2;
    transform: translate(0, -50%);
  }
  .el-checkbox {
    font-family: TT Norms Light;
    font-style: normal;
    font-weight: normal;
    line-height: 16px;
    font-size: 14px;
  }
  &__error {
    font-family: TT Norms Light;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #9a0f20;
  }
  &__content {
    .is-checked {
      .el-checkbox__inner {
        background-color: #7dbf4f;
        border-color: #7dbf4f;
        &:hover {
          border-color: #7dbf4f;
        }
      }
      .el-checkbox__label {
        color: #7dbf4f;
      }
    }
    .is-focus {
      .el-checkbox__inner {
        border-color: #7dbf4f;
        &:hover {
          border-color: #7dbf4f;
        }
      }
    }
  }
  .el-checkbox__label {
    font-family: TT Norms Light;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: #fff;
  }
}
.not-empty {
  .label {
    font-size: @subtitle-size - 2;
    top: -5px;
    left: 0;
    transition: color @time-description, top @time-description,
      left @time-description, font-size @time-description;
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
.is-error {
  .el-input__inner {
    border-color: #9a0f20 !important;
  }
  .el-input__icon {
    color: #9a0f20 !important;
  }
}
</style>
