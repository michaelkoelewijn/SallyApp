import React from "react"
import { connect } from 'react-redux'
import * as firebase from 'firebase';

var ctx, canvas;

class Confetti extends React.Component {

    constructor() {
        super();
        this.particles = [];
    }

    componentDidMount() {
        canvas = this.canvas;
        ctx = canvas.getContext('2d');
        window.addEventListener('resize', this.resize.bind(this));
        // window.addEventListener('click', this.initConfetti.bind(this))
        this.resize();
        this.draw();


        let database = firebase.initializeApp({
            apiKey: "AIzaSyBIWJftH7QW3WBnsD4jomI3DuGjpiRcPTw",
            authDomain: "sallyapp-895a4.firebaseapp.com",
            databaseURL: "https://sallyapp-895a4.firebaseio.com",
            projectId: "sallyapp-895a4",
            storageBucket: "",
            messagingSenderId: "285316895615"
        });
        
        var databaseDataAsArray = {}
        var usersRef = database.database().ref('users');
        usersRef.on('value', (snapshot) => {
                this.props.dispatch({
                    'type': 'ADD_STATS',
                    'payload': snapshot
                })
        })
    }

    getFormattedStatisticsArray(statistics) {
        let parsedArray = {}
        statistics.forEach((child, key) => {
            var childData = child.val()
            var name = child.key
            parsedArray[name] = []
            for(var record_id in childData) {
                let child = childData[record_id]
                parsedArray[name].push(child)
            }
        })
        return parsedArray
    }

    initConfetti() {
        let size = 0.6;
        let delay = 100;
        let offsetX = (canvas.width - canvas.width * size) / 2;
        let offsetY = (canvas.height - canvas.height * size) / 2;

        let center = { x: canvas.width / 2, y: canvas.height / 2};
        let topLeft = { x: offsetX,	y: offsetY }
        let topRight = {x: offsetX + canvas.width * size,	y: offsetY }
        let bottomLeft = { x: offsetX,	y: offsetY + canvas.height * size	}
        let bottomRight = { x: offsetX + canvas.width * size, y: offsetY + canvas.height * size	}

        for(let i = 0; i < 150; i++) {
            this.particles.push(new Particle({x: center.x, y:center.y}))
        }

        //Topleft
        setTimeout(() => {
            for(let i = 0; i < 150; i++) {
                this.particles.push(new Particle({x: topLeft.x, y:topLeft.y}))
            }	
        }, delay)

        //Topright
        setTimeout(() => {
            for(let i = 0; i < 150; i++) {
                this.particles.push(new Particle({x: topRight.x, y:topRight.y}))
            }	
        }, delay * 2)

        //Bottomleft
        setTimeout(() => {
            for(let i = 0; i < 150; i++) {
                this.particles.push(new Particle({x: bottomLeft.x, y:bottomLeft.y}))
            }	
        }, delay * 3)

        //Bottomright
        setTimeout(() => {
            for(let i = 0; i < 150; i++) {
                this.particles.push(new Particle({x: bottomRight.x, y:bottomRight.y}))
            }	
        }, delay * 4)	

    }

    draw() {
        let particle;
        ctx.clearRect(0,0,canvas.width, canvas.height);	
        for(let particle in this.particles) {
            this.particles[particle].draw();
            this.particles[particle].update();
            if(this.particles[particle].radius <= 0) {
                this.particles.splice(particle,1)
            }
        }
        requestAnimationFrame(this.draw.bind(this));
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    render() {
        let { statistics, player, timer } = this.props;
        let stats = this.getFormattedStatisticsArray(statistics) 

        var scoresByPerson = []
        if(stats[player]) {
            stats[player].map((data) => {
                scoresByPerson.push(data.seconds)
            })
        }



        if(timer == (Math.max(...scoresByPerson)) + 1) {
            this.initConfetti();
        }

        return (
            <canvas ref={(canvas) => this.canvas = canvas } className="confetti"></canvas>
        ) 
    }
}

export default connect(state => ({
    statistics: state.sally.statistics,
    player: state.sally.player,
    timer: state.sally.timer,
}))(Confetti)



class Particle {
    constructor(pos) {
        this.x = pos.x + this.getRandomPlusMinus() * Math.random() * 30;
        this.y = pos.y + this.getRandomPlusMinus() * Math.random() * 30;
        this.radius = 15;
		this.explosionRadius = 7; //10
		this.angle = this.random(0 ,Math.PI * 2);
		this.color = `${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1`;
		this.velocity = {
			x: Math.sin(this.angle) * this.explosionRadius,
			y: Math.cos(this.angle) * this.explosionRadius,
		};
    }   

    update() {
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.radius -= 0.65; //1
    }
    
    draw() {
        ctx.beginPath();
		ctx.fillStyle = `rgba(${this.color})`;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
    }

    getRandomPlusMinus() {
        return Math.round(Math.random()) * 2 - 1
    }

    random(min,max) {
        return Math.random()*(max-min+1)+min;
    }

}
