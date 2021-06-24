// 時間の呼び出し
let oldTime;
let record;
let min;
let sec;
let msec;

// ボタンの取得
const start=document.querySelector('.btnList__start');
const stop=document.querySelector('.btnList__stop');
const clear=document.querySelector('.btnList__clear');
const clicked=document.querySelector('.clicked');
// 出力エリア
const timer=document.querySelector('#timer');
const body=document.querySelector('body');
const comment=document.querySelector('h3');

// 流れ
// スタートボタンを押すと、その時間を記録する。　oldTime
// ストップを押すと、今の時間を記録する。nowTime
// 経過時間を見る　diff     now-old
// 分、秒、m秒を取得していく。     diffを割る。秒数の時は1000も必要

// スタートボタンの設定
start.addEventListener('click', function(){
    oldTime=Date.now();
    // 経過時間を更新していく。
    // 文字盤の表示
    countUp();
    // ボタン効果の設定
    start.classList.add("clicked");
    clear.classList.add("clicked");
    stop.classList.remove("clicked");
});

// 時間の計測
function countUp(){
    record=setTimeout(function(){       //setTimeoutは、以下の処理を第二引数後に実行しますよ。って関数
        const newTime=Date.now();       //コールバック関数内に親元の関数を実行すれば、第二引数後に実行される。
        const diff=newTime-oldTime;     //結果として、繰り返される。
        // 分の設定 0を添えて
        min=Math.floor(diff/ 60/ 1000);
        let minString=pad(min, 2);
        // 秒の設定 0を添えて
        sec=Math.floor(diff/ 1000);
        let secString=pad(sec, 2);
        blur(sec);
        // ミリ秒の設定 0を添えて
        msec=diff-(sec*1000);    //整数値の秒数だけを削る。
        let msecString=pad(msec, 3);

        // pタグの更新
        timer.textContent=`${minString}:${secString}:${msecString}`;
        countUp();
    }, 1);
}

// 数字が1桁やった時に0をつける処理　padStart
function pad(val, num){
    numStr=String(val);
    return numStr.padStart(num, '0');
}

// 7秒から、ぼやける処理
function blur(sec){
    if(sec>6){
        timer.classList.add('blur');
    }
}

// ストップボタンの設定
stop.addEventListener('click', function(){
    clearTimeout(record);   //clearTimeoutは、setTimeoutの返り値（関数式の変数名）を選択すればそれが止まる
    //秒数の判定
    judge();
    // ボタン効果の設定
    clear.classList.remove("clicked");
    stop.classList.add("clicked");
    timer.classList.remove('blur');
    });

// もし誤差1秒なら、惜しい！判定
// 3秒ならまた頑張ろう！判定
// それ以外なら、えええ、、、判定
function judge(){
    if(9<= sec && sec<=10){
        comments('すごい！！', 'red');
    }else if(7<=sec && sec <=13){
        comments('また頑張ろう！', 'yellow');
    }else{
        comments('もっと頑張ろう！', 'blue');
    }
}

function comments(com, color){
    comment.innerHTML=com;
    body.style.backgroundColor=color;
}

// クリアボタンの処理
clear.addEventListener('click', function(){
    timer.textContent='00:00:000';
    comment.textContent='　';
    body.style.backgroundColor='transparent';    

    // ボタン効果の設定
    start.classList.remove("clicked");
    stop.classList.add("clicked");
    clear.classList.add("clicked");
})