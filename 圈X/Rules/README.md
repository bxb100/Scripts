发现 <https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/refs/heads/master/Scripts/resource-parser.js> 可以转写 surge 的规则

- `via=0` 可以用于分流使用链式代理[^1]
- `opt-parser=true` 使用转写

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
- 使用的 policy 如下, 参考 <https://github.com/monkey6468/Quantumult-X#5quantumult-x-%E6%87%92%E4%BA%BA%E9%85%8D%E7%BD%AE>

```conf
[policy]
static=家宽, 🇺🇸 美国-家宽, img-url=homekit.system
static=节点选择, 自动选择, 香港, 台湾, 日本, 韩国, 新加坡, 美国, PROXY, DIRECT, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/Static.png
# 默认设置10分钟测速一次，当前使用节点延迟和最新测速延迟最低的节点相差80ms以上则切换为最新的最低延迟节点，否则继续延用节点
url-latency-benchmark=自动选择, server-tag-regex=.*, check-interval=600, tolerance=20, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/Urltest.png
url-latency-benchmark=香港, server-tag-regex=(?=.*(港|HK|(?i)Hong))^((?!(台湾|日本|新加坡|美国|韩国|狮城|南朝鲜|US|SG|JP|KR|TW|台灣|美國|韓國|獅城)).)*$, check-interval=600, tolerance=20, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/HK.png
url-latency-benchmark=台湾, server-tag-regex=(?=.*(台|TW|(?i)Taiwan))^((?!(港|日|韩|新|美)).)*$, check-interval=600, tolerance=20, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/TW.png
url-latency-benchmark=日本, server-tag-regex=(?=.*(日本|JP|(?i)Japan))^((?!(香港|台湾|新加坡|美国|韩国|狮城|南朝鲜|US|SG|KR|HK|TW|台灣|美國|韓國|獅城)).)*$, check-interval=600, tolerance=20, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/JP.png
url-latency-benchmark=韩国, server-tag-regex=(?=.*(KR|Korea|KOR|首尔|韩|韓|(?i)Korea))^((?!(香港|台湾|新加坡|美国|狮城|南朝鲜|US|SG|HK|TW|台灣|美國|獅城)).)*$, check-interval=600, tolerance=20, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/KR.png
url-latency-benchmark=新加坡, server-tag-regex=(?=.*(新加坡|狮城|SG|(?i)Singapore))^((?!(香港|台湾|日本|美国|韩国|南朝鲜|US|JP|KR|HK|TW|台灣|美國|韓國)).)*$, check-interval=600, tolerance=20, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/SG.png
url-latency-benchmark=美国, server-tag-regex=(?=.*(美国|美國|US|洛杉矶|西雅图|(?i)States|American))^((?!(香港|台湾|日本|新加坡|韩国|狮城|南朝鲜|SG|JP|KR|HK|TW|台灣|韓國|獅城)).)*$, check-interval=600, tolerance=30, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/US.png
static=漏网之鱼, 节点选择, 自动选择, 香港, 台湾, 日本, 韩国, 新加坡, 美国, PROXY, DIRECT, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/Final.png
```

[^1]: https://github.com/crossutility/Quantumult-X/issues/100#issuecomment-2310444382
[^2]: https://github.com/KOP-XIAO/QuantumultX/pull/9
