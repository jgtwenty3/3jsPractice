import * as THREE from 'three'

import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"



export default class Experience{
	constructor(canvas){
		
		window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
       
        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
	}
	resize(){

	}
	update(){
		
	}
	
}