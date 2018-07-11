var vm = new Vue({
  el: '#app',
  data: $.extend(window.pageData, {
    hasLogin: window.pageData.hasLogin || '0',
    actStart: window.pageData.actStart || '0',
    actEnd: window.pageData.actEnd || '0',
    pageUrl: window.pageData.pageUrl || window.location.href,
    shareContent: window.pageData.shareContent || {},
    tf8LogContent: window.pageData.tf8LogContent || {},
    showModal: false,
    modalId: '',
    tf8Common: window.tf8Common,
    tf8Utils: window.tf8Utils,
    tf8Env: window.tf8Env,
    req_nameReqUrl: 'req_nameReqUrl.json'
  }),
  methods: {
    // 下载App弹窗
    downloadApp: function () {
      if (window.tf8Env.thirdApp.isWeixin) {
        this.openModal('downloadTipWx');
      } else {
        this.openModal('downloadTip');
      }
    },
    // 登录
    toLogin: function () {
      window.tf8Common.loginByWap(this.pageUrl);
    },
    // 显示弹窗
    openModal: function (modalId) {
      this.showModal = true;
      this.modalId = modalId;
    },
    // 关闭弹窗
    closeModal: function () {
      this.showModal = false;
    },
    // 唤起到页面地址
    locationTo: function (url, title) {
      window.tf8Common.awakeApp('taofen8-master://wl?id=' + encodeURIComponent(url) + '&p=' + title);
    },
    // 替换当前页面
    replaceTo: function (url) {
      window.location.replace(url);
    },
    // 请求
    req_nameReq: function () {
      var self = this;
      window.tf8Common.ajax(self.req_nameReqUrl, {
        data: {

        },
        success: function (data) {
          if (data.req_nameSuccess === '1') {

          } else {
            window.tf8Utils.toast(data.exceptionMsg);
          }
        }
      });
    }
  },
  mounted: function () {
    var self = this;
    window.FastClick && FastClick.attach(document.body);
    // viewport-fit=cover时，在iPhone X上，客户端webview高度偶尔会出现没有撑开的情况，须手动设置一下高度
    $(document).height($('body').height());

    // 外部浏览器打开默认唤起
    if (!window.tf8Env.tf8App.isTf8App && !window.tf8Env.thirdApp.isWeixin) {
      window.tf8Common.awakeApp('taofen8-master://wl/?id=' + encodeURIComponent(self.pageUrl) + '&p=' + encodeURIComponent(document.title));
    }
  }
});