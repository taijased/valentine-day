<template lang="pug">
  .creator
    .left-bar
      el-form(label-position='left', :model='ruleForm', :rules="rules", status-icon, ref="ruleForm", class="creator-form")
        el-form-item(prop="fromWhom", :class="{'not-empty': ruleForm.fromWhom !== ''}")
          el-input(v-model='ruleForm.fromWhom', autocomplete="off")
          .label *{{$t("form.fromWhom")}}
        el-form-item(prop="forWhom", :class="{'not-empty': ruleForm.forWhom !== ''}")
          el-input(v-model='ruleForm.forWhom', autocomplete="off")
          .label *{{$t("form.forWhom")}}
        el-form-item(prop="email", :class="{'not-empty': ruleForm.email !== ''}")
          el-input(v-model='ruleForm.email', autocomplete="off")
          .label *E-mail
        el-form-item(prop="message", :class="{'not-empty': ruleForm.message !== ''}")
          el-input(type="textarea", v-model="ruleForm.message", maxlength="160")
          .label 
            span {{$t("form.greetingText")}}
            span(v-if="ruleForm.message !== '' && ruleForm.message.length !== 160") {{160 - ruleForm.message.length}}
        el-form-item(prop="checkbox")
          el-checkbox(v-model='ruleForm.checkbox', fill="#007f48", autocomplete="off", :label='$t("form.personalData")')
      .btn-primary(@click="submitForm()", :class="{'disabled-btn': disabledBtn}") {{$t("landing.btn")}}
      .qiwi 
         a(href="https://qiwi.com/p/79655864752", target="_blank")  {{$t("form.support")}}
    .right-bar
     Iphone
</template>
<script>
import AppHeader from "../components/Header";
import Iphone from "../components/Iphone";
import ValentineService from "../api/ValentineService.js";
import { mapGetters, mapActions } from "vuex";
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
          this.setText(value);
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
      disabledBtn: false,
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
      setText: "form/setText",
      showMainHeart: "valentine/showMainHeart",
    }),
    submitForm() {

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.disabledBtn = true
          try {
            new Promise((resolve, reject) => {
              const data = {
                from: this.ruleForm.fromWhom,
                to: this.ruleForm.forWhom,
                text: this.ruleForm.message,
                email: this.ruleForm.email,
                сonsent: true
              }
              ValentineService.createValentine(data)
                .then(response => {
                  console.log(response);
                  if (response.data.success) {
                    this.disabledBtn = false
                    window.location.href = response.data.pay_url;
                  } else {
                    reject(response)
                  }
                  resolve(response)
                })
                .catch(reject)
            })
          } catch (error) {
            return false
          }
          
        } else {
          return false;
        }
      });
    }
  },
  created () {
    this.showMainHeart()
    new Promise((resolve, reject) => {
      ValentineService.setCounter()
        .then(resolve)
        .catch(reject);
    });
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
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #000;
  @media @xs {
    margin: 250px 0;
    margin: 0;
    padding: 0;
    height: auto;
    overflow-y: auto;
  }
  .left-bar {
    height: auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media @xs {
      margin-top: 50px;
      width: 100%;
      height: auto;
      align-items: center;
    }
    .creator-form {
      width: 300px;
    }
  }
  .right-bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
  .qiwi {
    margin-top: 25px;
    a {
      text-align: center;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.6);
      font-family: TT Norms Regular;
      font-style: normal;
      font-weight: normal;
      line-height: 16px;
      font-size: 20px;
      &:hover {
        color: white;
        transition: color 0.3s;
      }
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
.disabled-btn {
  user-select: none;
  pointer-events: none;
  opacity: 0.7;
}
</style>
