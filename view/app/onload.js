window.onload = () => {
    /*     $("#2B39A329").click(function () {
        const a = document.querySelectorAll(".crafting_table");
        const b = document.querySelectorAll(".ancient_debris");
        if ($("#2B39A329").prop("checked")) {
            $(a).removeClass("dispnone");
            $(b).removeClass("dispnone");
        } else {
            $(a).addClass("dispnone");
            $(b).addClass("dispnone");
        }
    }); */
    $("#win").attr(
        "style",
        "transform: scale(1); opacity: 1; transition: all 250ms cubic-bezier(0.04, 0.47, 0.47, 0.98)"
    );
    console.log(`
     ___  __         __       __  ___          _         __                      __          
    / _ )/ /__ _____/ /__    /  |/  /__ ____ _(_)___    / /  ___ ___ _____  ____/ /  ___ ____        
   / _  / / _ \`/ __/  '_/   / /|_/ / _ \`/ _ \`/ / __/   / /__/ _ \`/ // / _ \\/ __/ _ \\/ -_) __/    
  /____/_/\\_,_/\\__/_/\\_\\   /_/  /_/\\_,_/\\_, /_/\\__/   /____/\\_,_/\\_,_/_//_/\\__/_//_/\\__/_/       
                                       /___/                    
    Black Magic Launcher v1.0.0-b1                               由 Broken_Deer 用 ❤️ 制作
  `);
    ipc.send('onload')
    ipc.send('event-obj')
};