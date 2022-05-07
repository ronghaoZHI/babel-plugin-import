import _Icon from "element-ui/lib/icon";
import _Button from "element-ui/lib/button";

if (_theme_zz_ui_zlj_) {
  import(
  /* webpackChunkName: "zz-ui-zljStyle" */
  'element-ui/lib/icon/style/zlj}');
} else {
  import(
  /* webpackChunkName: "zz-ui-zzStyle" */
  'element-ui/lib/icon/style/index}');
}

if (_theme_zz_ui_zlj_) {
  import(
  /* webpackChunkName: "zz-ui-zljStyle" */
  'element-ui/lib/button/style/zlj}');
} else {
  import(
  /* webpackChunkName: "zz-ui-zzStyle" */
  'element-ui/lib/button/style/index}');
}

ReactDOM.render( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Button, null, "xxxx"), /*#__PURE__*/React.createElement(_Icon, null)));