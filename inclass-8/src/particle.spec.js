import { expect } from 'chai'
import particle, { update } from './particle'

describe('Particle Functionality', () => {

    var height = 600
    var width = 600

    var canvas = {width, height}
    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // IMPLEMENT ME:
        //   check position, velocity, acceleration, mass
        //   these should all be numbers or arrays of numbers
        expect(p.position).to.be.ok
        expect(p.velocity).to.be.ok
        expect(p.acceleration).to.be.ok
        expect(p.mass).to.be.ok
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0, canvas)
        expect(position[0]).to.be.closeTo(1.5, 0.0001)
        expect(position[1]).to.be.closeTo(0.5, 0.0001)
        //expect(position[0]).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0, canvas) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        const p = particle({ velocity: [1, 1], acceleration: [0.5, -0.5] })
        const { velocity } = update(p, 2.0, canvas) // dt is different here
        expect(velocity).to.eql([2.0, 0.0])
    })

    it('particles should wrap around the world', () => {
        // IMPLEMENT ME:
        
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides

        // you will want to send the canvas into the update function
        // this means you decide the size of the canvas here.
        // canvas = { width, height }
        const p = particle ({position: [900, 900], velocity: [0.5, -0.5]})
        const { position } = update(p, 1.0, canvas)
        expect(position[0] <= canvas.width).to.be.true
        expect(position[0] >= 0).to.be.true
        expect(position[1] <= canvas.height).to.be.true
        expect(position[1] >= 0).to.be.true
    })

})
