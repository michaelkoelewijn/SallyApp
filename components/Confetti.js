import React from "react"
import { connect } from 'react-redux'

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
        window.addEventListener('click', this.initConfetti.bind(this))
        this.resize();
        this.draw();
    }



    initConfetti() {
        let size = 0.6;
        let delay = 200;
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
        let { statistics, player, timer, playerRecord } = this.props;

        if(timer == playerRecord + 1) {
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
    playerRecord: state.sally.playerRecord
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
