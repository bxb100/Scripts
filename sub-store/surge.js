//https://raw.githubusercontent.com/bxb100/Scripts/refs/heads/main/sub-store/surge.js#name=订阅名称&remote=https%3A%2F%2Fsub.store%2Fapi%2Ffile%2Fikuuu-remote

const {name, remote} = $arguments

const managed_config = remote ? remote : `https://sub.store/api/file/${name}-remote`

let surgeProxies = await produceArtifact({
  type: 'subscription',
  name,
  platform: 'SurgeMac'
})

$content = `#!MANAGED-CONFIG ${managed_config} interval=43200 strict=true\n[Proxy]\n${surgeProxies}\n\n[Rule]\nFINAL,DIRECT`
