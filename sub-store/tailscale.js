const $ = $substore;
const tailnetId = $arguments.tailnetId
const token = $arguments.token
async function http(opt = {}) {
  const METHOD = opt.method || "get";
  const TIMEOUT = parseFloat(opt.timeout || $arguments.timeout || 5000);
  const RETRIES = parseFloat(opt.retries ?? $arguments.retries ?? 1);
  const RETRY_DELAY = parseFloat(
    opt.retry_delay ?? $arguments.retry_delay ?? 1000,
  );

  let count = 0;
  const fn = async () => {
    try {
      return await $.http[METHOD]({ ...opt, timeout: TIMEOUT });
    } catch (e) {
      // $.error(e)
      if (count < RETRIES) {
        count++;
        const delay = RETRY_DELAY * count;
        // $.info(`第 ${count} 次请求失败: ${e.message || e}, 等待 ${delay / 1000}s 后重试`)
        await $.wait(delay);
        return await fn();
      } else {
        throw e;
      }
    }
  };
  return await fn();
}
const res = await http({
  method: "get",
  url: `https://api.tailscale.com/api/v2/tailnet/${tailnetId}/devices`,
  headers: {
    Authorization:
      `Bearer ${token}`,
  },
});
const yaml = ProxyUtils.yaml.safeLoad($content ?? $files[0]);
yaml.hosts = yaml.hosts || {}
JSON.parse(res.body).devices.forEach((device) => {
  const ipv4 = device.addresses[0];
  const name = device.name;
  const alias = name.split('.')[0];
  Object.assign(yaml.hosts, { [name]: ipv4, [alias]: ipv4 });
});
$content = ProxyUtils.yaml.safeDump(yaml);
