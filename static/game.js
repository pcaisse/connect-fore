t=0,g=Array(43).join(),document.body.children[0].onclick=function(e){if(c=e.target.cellIndex,g&&c+1){for(i=35+c;i>=0&&","!=g[i];i-=7);i>=0&&(g=g.slice(0,i)+t+g.slice(i+1),/(\d)(\1{3}|(.{6}\1){3}|(.{7}\1){3}|(.{5}\1){3})/.exec(g)&&(g=console.log("WINNER!")),this.rows[i/7|0].cells[i%7].style.background=t?"red":"#ff0",t=+!t)}}
