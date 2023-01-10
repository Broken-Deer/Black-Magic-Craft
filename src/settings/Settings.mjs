function getSettings() {
    return {
        banners: [
            '1.9',
            '1.11',
            '1.12',
            '1.13',
            '1.14',
            '1.15',
            '1.16',
            '1.17',
            '1.18',
            '1.19'
        ],
        defaultLaunchSettings:
        {
            globle: {
                update: {
                    beta: false,
                    auto: true,
                    ext: true,
                    safe: true
                },
                game: {
                    autojv: true,
                    jvpath: "",
                    gmwintitle: "",
                    lauchermsg: "",
                    serverIP: "",
                    process: "high",
                    width: "",
                    height: "",
                    automem: true,
                    mem: 4096,
                    gmarg: "",
                    beforeExec: "",
                    afterExec: "",
                    wrapcomm: "",
                    jvmarg: "",
                    memPersistenceArea: 0,
                    nativesDir: "",
                    noJVMArgs: false,
                    notCheckGame: false,
                    notCheckJVM: false,
                    sysGLFW: false,
                    sysOpenAL: false
                },
                advanced: {
                    gc: 1,
                    checklib: true,
                    savelog: false
                },
                accounts: {
                    uuid: {
                        name: 'a'
                    }
                },
                appearance: {
                    theme: "default",
                    themecolor: "#600081",
                    backgroundType: "Gradient"
                },
                download: {
                    module: 1,
                    throttling: false,
                    maxThreadNum: 1,
                    maxDownloadSpeed: 1
                },
                accessibility: {
                    ReleaseUpdateMsg: true,
                    betaUpdateMsg: true,
                    chengeLang: true,
                    AnimationSpeed: 3,
                    disableAllAnimation: false,
                    OptimizedForScreenReader: false,
                    highContrast: false
                }
            }
        }
    }
}

export {
    getSettings
}