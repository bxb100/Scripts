发现 <https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/refs/heads/master/Scripts/resource-parser.js> 可以转写 surge 的规则

- `via=0` 可以用于分流使用链式代理[^1]

```conf
[filter_remote]
https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/direct.txt, tag=直连域名列表, force-policy=direct, update-interval=172800, opt-parser=true, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Lan/Lan.list, tag=Lan网, force-policy=direct, update-interval=172800, opt-parser=true, enabled=true
https://ruleset.skk.moe/List/non_ip/apple_cdn.conf, tag=Apple CDN, force-policy=direct, update-interval=172800, opt-parser=true, enabled=true
https://ruleset.skk.moe/List/non_ip/microsoft_cdn.conf, tag=Microsoft CDN, force-policy=direct, update-interval=172800, opt-parser=true, enabled=true
https://raw.githubusercontent.com/fangkuia/XPTV/main/X/loon%26surge%26shadowrocket.list, tag=娱乐, force-policy=direct, update-interval=172800, opt-parser=true, enabled=true
https://raw.githubusercontent.com/bxb100/Scripts/refs/heads/main/Surge/ai-tools.txt#via=0, tag=ai-tools, force-policy=家宽, update-interval=172800, opt-parser=true, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Developer/Developer.list, tag=开发者服务, force-policy=节点选择, update-interval=172800, opt-parser=true, enabled=true
https://raw.githubusercontent.com/chenyk1219/surge/release/Unblocking.list, tag=白名单, force-policy=direct, update-interval=172800, opt-parser=true, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Direct/Direct.list, tag=规则修正, force-policy=direct, update-interval=172800, opt-parser=true, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Privacy/Privacy_All_No_Resolve.list, tag=隐私保护, force-policy=reject, update-interval=172800, opt-parser=true, enabled=true
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Surge/Download/Download.list, tag=下载网站, force-policy=direct, update-interval=172800, opt-parser=true, enabled=true
https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/ruleset/gfw.txt, tag=GFW, force-policy=节点选择, update-interval=172800, opt-parser=true, enabled=true
```

- `sfilter` 可以过滤节点[^2] 我用的代码如下

```js
function filter(nodes) {
  const names = nodes.names;
  const unused = $.filter(names, /套餐到期|距离下次|建议：/i);
  return NOT(unused);
}
```

在订阅后加上 `#sfilter=ZnVuY3Rpb24gZmlsdGVyKG5vZGVzKSB7CiAgY29uc3QgbmFtZXMgPSBub2Rlcy5uYW1lczsKICBjb25zdCB1bnVzZWQgPSAkLmZpbHRlcihuYW1lcywgL+Wll+mkkOWIsOacn3zot53nprvkuIvmrKF85bu66K6u77yaL2kpOwogIHJldHVybiBOT1QodW51c2VkKTsKfQ==&sort=1`

- 有的节点返回 mismatch, 可以在订阅节点后加上 `?flag=shadowrocket` 类似 UA?

[^1]: https://github.com/crossutility/Quantumult-X/issues/100#issuecomment-2310444382
[^2]: https://github.com/KOP-XIAO/QuantumultX/pull/9
