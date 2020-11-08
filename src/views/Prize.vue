<template>
    <div class="groundimg">
        <div class="title">
            超级大抽奖
        </div>
        <div class="all">
            <div class="mymoney">我的金豆：<span style="color: red">{{money}}</span></div>
            <ul class="lis">
                <li ref="li1"><span>10000<br>金豆</span></li>
                <li ref="li2"><span>100<br>金豆</span></li>
                <li ref="li3"><span>500<br>金豆</span></li>
                <li ref="li4"><span>1000<br>金豆</span></li>
                <li>
                    <Button class="start" @click="start">立即<br/>抽奖</Button>
                </li>
                <li ref="li5"><span>1<br>金豆</span></li>
                <li ref="li6"><span>100<br>金豆</span></li>
                <li ref="li7"><span>200<br>金豆</span></li>
                <li ref="li8"><span>谢谢<br>惠顾</span></li>
            </ul>
        </div>
        <div v-if="showPrize" class="showprize">
            <div>
                <p class="one">{{key}}</p>
                <p class="two">{{value}}</p>
                <span @click="showPrize = false"><strong>X</strong></span>
            </div>
        </div>
    </div>

</template>

<script>
    import {Button} from 'free-user-interface'
    import 'free-user-interface/dist/lib/free.css'

    export default {
        name: "Prize",
        components: {Button},
        data() {
            return {
                money: 1000,
                play: -1, //起点
                over: null, //中奖位置
                time: 1000, //切换时间
                rolls: 30, //最少转动次数
                click: true, //禁止连点
                lis: [],
                showPrize: false,
                timeout: null,
                key:'',
                value: ''
            }
        },
        methods: {
            start() {
                if (!this.click){
                    return
                }
                if (this.money < 300){
                    window.alert('金豆不足')
                    return;
                }else {
                    this.money -= 300
                }
                this.time = 1000
                this.rolls = 30
                this.click = false
                this.over = Math.floor(Math.random()*(7-0+1)+0)
                console.log(this.over)
                this.startroll()
            },
            startroll() {
                this.play += 1
                this.rolls -= 1
                if (this.play < 1){
                    this.lis[this.lis.length-1].style.background = 'rgb(252, 237, 64)'
                    this.lis[this.lis.length-1].style.boxShadow = 'inset 0px -1em 15px rgb(248, 213, 58);'
                    this.lis[this.play].style.background = 'rgb(109,101,27)'
                    this.lis[this.play].style.boxShadow = 'none'
                }else {
                    this.lis[this.play -1].style.background = 'rgb(252, 237, 64)'
                    this.lis[this.play -1].style.boxShadow = 'inset 0px -1em 15px rgb(248, 213, 58);'
                    console.log(this.play)
                    this.lis[this.play].style.background = 'rgb(109,101,27)'
                    this.lis[this.play].style.boxShadow = 'none'
                }
                if (this.rolls <= 0 && this.play === this.over){
                    clearTimeout(this.timeout)
                    this.showPrize = true
                    if (this.over === 0){
                        this.key = '恭喜中奖'
                        this.value = '10000金豆'
                        this.money += 10000
                    }else if (this.over === 1){
                        this.key = '恭喜中奖'
                        this.value = '100金豆'
                        this.money += 100
                    }else if (this.over === 2){
                        this.key = '恭喜中奖'
                        this.value = '500金豆'
                        this.money += 500
                    }else if (this.over === 3){
                        this.key = '恭喜中奖'
                        this.value = '1金豆'
                        this.money += 1
                    }else if (this.over === 4){
                        this.key = '很遗憾'
                        this.value = '谢谢惠顾'
                    }else if (this.over === 5){
                        this.key = '恭喜中奖'
                        this.value = '200金豆'
                        this.money += 200
                    }else if (this.over === 6){
                        this.key = '恭喜中奖'
                        this.value = '100金豆'
                        this.money += 100
                    }else if (this.over === 7){
                        this.key = '恭喜中奖'
                        this.value = '1000金豆'
                        this.money += 1000
                    }
                    if (this.play === 7) {
                        this.play = -1
                    }
                    this.showPrize = true
                    this.click = true
                    return
                }
                if (this.play === 7) {
                    this.play = -1
                }

                if (this.rolls >20 && this.time > 200 ){
                    this.time -= 100
                }else if (this.rolls < 3 && this.time <800){
                    this.time += 200
                }

                 this.timeout = setTimeout(this.startroll,this.time)
            }
        },
        mounted() {
            const lis = [this.$refs.li1, this.$refs.li2, this.$refs.li3, this.$refs.li5, this.$refs.li8, this.$refs.li7, this.$refs.li6, this.$refs.li4]
            this.lis = lis
        }
    }
</script>

<style scoped lang="scss">
    li {
        list-style: none;
    }

    .groundimg {
        height: 888px;
        background-image: url("../assets/choujiang.jpg");
        background-repeat: no-repeat;
        background-position: center 0;

        > .title {
            font-size: 1.5em;
            width: 45%;
            background: rgb(247, 211, 57);
            position: absolute;
            top: 1em;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 1em;
            line-height: 2em;
            color: rgb(94, 37, 15);
        }

    }

    .all {
        position: absolute;
        top: 38%;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        height: 25em;
        background: rgb(244, 191, 54);
        border-radius: 1em;
    }

    .mymoney {
        line-height: 2.5em;
    }

    .lis {
        position: absolute;
        top: 2.5em;
        left: 50%;
        transform: translateX(-50%);
        width: 86%;
        height: 83%;
        background: rgb(162, 20, 19);
        border-radius: 0.5em;

        li {
            float: left;
            margin: 1.35%;
            background: rgb(252, 237, 64);
            width: 30.5%;
            height: 30.5%;
            box-shadow: inset 0px -1em 15px rgb(248, 213, 58);
            border-radius: 0.7em;

            span {
                display: block;
                margin-top: 50%;
                transform: translateY(-50%);
                font-size: 1.2em;
            }

            .start {
                margin-top: 0.1em;
                width: 95%;
                height: 80%;
                border-radius: 0.7em;
                font-size: 1.3em;
                background: red;
                color: white;
            }
        }

    }
    .showprize{
        background: rgba(0,0,0,.5);
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1100;
        div{
            width: 80%;
            height: 25%;
            background: white;
            position: absolute;
            top: 18em;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 1em;
            > .one{
                margin: 1em;
                font-size: 2em;
            }
            > .two{
                font-size: 1.3em;
            }
            > span{
                width: 1em;
                height: 1em;
                padding: .3em;
                line-height: 1em;
                border-radius: 1em;
                border: solid 1px #000000;
                position: absolute;
                top: 1em;
                right: 1em;
            }
        }
    }
</style>
