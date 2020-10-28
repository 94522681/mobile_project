<template>
  <div class="login-container">
    <van-nav-bar title="登录" left-text="返回" left-arrow  @click-left="$router.back()"/>
    <van-form @submit="onLogin" ref="loginFrom">
      <van-field  placeholder="请输入手机号" v-model="user.mobile" name="mobile"
      clearable required maxlength="11" type="number" :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field clearable name="code" placeholder="请输入验证码" v-model="user.code" maxlength="6"  type="number"  required :rules="userFormRules.code">
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
          <van-count-down v-if="isCountDownShow" slot="button" :time="1000*60" format="ss s" @finish="isCountDownShow = false"></van-count-down>
          <van-button class="send-sms-btn" size="small" type="default" slot="button" @click="onSendSms" v-else  round native-type="button">发送验证码</van-button>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          round
          block
          type="info"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'
export default {
  data () {
    return {
      isCountDownShow: false,
      user: {
        mobile: '13657443609',
        code: '246810'
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式异常'
        }],
        code: [{
          required: true,
          meddage: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      }
    }
  },
  methods: {
    async onLogin () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '登陆中'
      })
      try {
        const { data: res } = await login(this.user)
        console.log(res)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功')
        // console.log(this.$store.state.user)
        if (this.$store.state.user) {
          this.$router.back()
        }
      } catch (err) {
        console.log(err)
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
    },
    async onSendSms () {
      try {
        console.log(this.$refs.loginFrom.validate)
        await this.$refs.loginFrom.validate('mobile')
      } catch (err) {
        return this.$toast.fail('验证失败' + err)
      }
      this.isCountDownShow = true
      try {
        const { data: res } = await getSmsCode(this.user.mobile)
        console.log(res)
        this.$toast.success('短信验证码发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast.fail('发送太频繁了,请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
        this.isCountDownShow = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 18px;
    color: #666;
    border: none;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    border: none;
  }
}
</style>
