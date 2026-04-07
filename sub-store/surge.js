//https://raw.githubusercontent.com/bxb100/Scripts/refs/heads/main/sub-store/surge.js#name=订阅名称

const {name} = $arguments

let surgeProxies = await produceArtifact({
    type: 'subscription',
    name,
    platform: 'SurgeMac'
})

$content = `[Proxy]\n${surgeProxies}\n\n[Rule]\nFINAL,DIRECT`
