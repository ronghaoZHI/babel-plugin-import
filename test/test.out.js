import _Icon from "element-ui/lib/icon";
import _Button from "element-ui/lib/button";

var _theme_zz = !window.navigator.userAgent.includes("zhaoliangji");

if (_theme_zz) {
  import("element-ui/lib/element-ui/lib/icon/style/index");
} else {
  import("element-ui/lib/element-ui/lib/icon/style/zlj");
}

if (_theme_zz) {
  import("element-ui/lib/element-ui/lib/button/style/index");
} else {
  import("element-ui/lib/element-ui/lib/button/style/zlj");
}

ReactDOM.render( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_Button, null, "xxxx"), /*#__PURE__*/React.createElement(_Icon, null)));