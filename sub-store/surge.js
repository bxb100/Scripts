const {name} = $arguments

let surgeProxies = await produceArtifact({
    type: 'subscription',
    name,
    platform: 'SurgeMac'
})

$content = `[General]\n\n[Rule]\nFINAL,DIRECT\n\n[Proxy]\n${surgeProxies}`
