

  
// Array of path objects, each containing an array of particles
let paths = [];

// How long until the next particle
let framesBetweenParticles = 5;
let nextParticleFrame = 0;

// Location of last created particle
let previousParticlePosition;

// How long it takes for a particle to fade out
let particleFadeFrames = 300;

function setup() {
  createCanvas(720, 400);
  colorMode(HSB);

  // Start with a default vector and then use this to save the position
  // of the last created particle
  previousParticlePosition = createVector();
  describe(
    'When the cursor drags along the black background, it draws a pattern of multicolored circles outlined in white and connected by white lines. The circles and lines fade out over time.'
  );
}

function draw() {
  background(0);

  // Update and draw all paths
  for (let path of paths) {
    path.update();
    path.display();
  }
}


  

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {

    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
// Create a new path when mouse is pressed
function mousePressed() {
  nextParticleFrame = frameCount;
  paths.push(new Path());

  // Reset previous particle position to mouse
  // so that first particle in path has zero velocity
  previousParticlePosition.set(mouseX, mouseY);
  createParticle();
}

// Add particles when mouse is dragged
function mouseDragged() {
  // If it's time for a new point
  if (frameCount >= nextParticleFrame) {
    createParticle();
  }
}

function createParticle() {
  // Grab mouse position
  let mousePosition = createVector(mouseX, mouseY);

  // New particle's velocity is based on mouse movement
  let velocity = p5.Vector.sub(mousePosition, previousParticlePosition);
  velocity.mult(0.05);

  // Add new particle
  let lastPath = paths[paths.length - 1];
  lastPath.addParticle(mousePosition, velocity);

  // Schedule next particle
  nextParticleFrame = frameCount + framesBetweenParticles;

  // Store mouse values
  previousParticlePosition.set(mouseX, mouseY);
}

// Path is a list of particles
class Path {
  constructor() {
    this.particles = [];
  }

  addParticle(position, velocity) {
    // Add a new particle with a position, velocity, and hue
    let particleHue = 0 //(this.particles.length * 30) % 360;
    this.particles.push(new Particle(position, velocity, particleHue));
  }

  // Update all particles
  update() {
    for (let particle of this.particles) {
      particle.update();
    }
  }

  // Draw a line between two particles
  connectParticles(particleA, particleB) {
    let opacity = particleA.framesRemaining / particleFadeFrames;
    stroke(255, opacity);
    line(
      particleA.position.x,
      particleA.position.y,
      particleB.position.x,
      particleB.position.y
    );
  }

  // Display path
  display() {
    // Loop through backwards so that when a particle is removed,
    // the index number for the next loop will match up with the
    // particle before the removed one
    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      // Remove this particle if it has no frames remaining
      if (this.particles[i].framesRemaining <= 0) {
        this.particles.splice(i, 1);

        // Otherwise, display it
      } else {
        this.particles[i].display();

        // If there is a particle after this one
        if (i < this.particles.length - 1) {
          // Connect them with a line
          this.connectParticles(this.particles[i], this.particles[i + 1]);
        }
      }
    }
  }
}

// Particle along a path
class Particle {
  constructor(position, velocity, hue) {
    this.position = position.copy();
    this.velocity = velocity.copy();
    this.hue = hue;
    this.drag = 0.95;
    this.framesRemaining = particleFadeFrames;
  }

  update() {
    // Move it
    this.position.add(this.velocity);

    // this moves the stars down
    // this.position.y += 2.5
    this.position.x += random(-0.5, 0.5)
    this.position.y += random(-0.5, 0.5) 


    // Slow it down
    this.velocity.mult(this.drag * 0.5);

    // this is responsible for fading stars and removing them from the sketch
    this.framesRemaining = this.framesRemaining - 1;
  }

  // Draw particle
  display() {
    // uncomment the next line if you want stars to fade out
    // let opacity = this.framesRemaining / particleFadeFrames;
    
    // comment out this line if you want stars to fade out
    let opacity = 1; 

    noStroke();
    fill(this.hue, 0, 90, opacity);
            let size = random(1, 5);
    //twinkle stars 
    //thank you rowan/ the surgeon for ur help :3

    star(this.position.x, this.position.y, size, 10, 5);
    // star(x, y, 50, 100, 5);
  }
}
  
  
  
  
  
  
  //star(width/2, height/2, 50, 100, 5);
// }
  

// function star(x, y, radius1, radius2, npoints) {
//   let angle = TWO_PI / npoints;
//   let halfAngle = angle / 2.0;
//   beginShape();
//   for (let a = 0; a < TWO_PI; a += angle) {
//     let sx = x + cos(a) * radius2;
//     let sy = y + sin(a) * radius2;
//     vertex(sx, sy);
//     sx = x + cos(a + halfAngle) * radius1;
//     sy = y + sin(a + halfAngle) * radius1;
//     vertex(sx, sy);
//   }
//   endShape(CLOSE);
// }




// // Array of path objects, each containing an array of particles
// let paths = [];

// // How long until the next particle
// let framesBetweenParticles = 5;
// let nextParticleFrame = 0;

// // Location of last created particle
// let previousParticlePosition;

// // How long it takes for a particle to fade out
// let particleFadeFrames = 300;


// function star(x, y, radius1, radius2, npoints) {
//   let angle = TWO_PI / npoints;
//   let halfAngle = angle / 2.0;
//   beginShape();
//   for (let a = 0; a < TWO_PI; a += angle) {
//     let sx = x + cos(a) * radius2;
//     let sy = y + sin(a) * radius2;
//     vertex(sx, sy);
//     sx = x + cos(a + halfAngle) * radius1;
//     sy = y + sin(a + halfAngle) * radius1;
//     vertex(sx, sy);
//   }
//   endShape(CLOSE);
// }

// function setup() {
//   createCanvas(720, 400);
//   colorMode(HSB);

//   // Start with a default vector and then use this to save the position
//   // of the last created particle
//   previousParticlePosition = createVector();
//   describe(
//     'When the cursor drags along the black background, it draws a pattern of multicolored circles outlined in white and connected by white lines. The circles and lines fade out over time.'
//   );
// }

// function draw() {
//   background(0);

//   // Update and draw all paths
//   for (let path of paths) {
//     path.update();
//     path.display();
//   }
// }

// // Create a new path when mouse is pressed
// function mousePressed() {
//   nextParticleFrame = frameCount;
//   paths.push(new Path());

//   // Reset previous particle position to mouse
//   // so that first particle in path has zero velocity
//   previousParticlePosition.set(mouseX, mouseY);
//   createParticle();
// }

// // Add particles when mouse is dragged
// function mouseDragged() {
//   // If it's time for a new point
//   if (frameCount >= nextParticleFrame) {
//     createParticle();
//   }
// }

// function createParticle() {
//   // Grab mouse position
//   let mousePosition = createVector(mouseX, mouseY);

//   // New particle's velocity is based on mouse movement
//   let velocity = p5.Vector.sub(mousePosition, previousParticlePosition);
//   velocity.mult(0.05);

//   // Add new particle
//   let lastPath = paths[paths.length - 1];
//   lastPath.addParticle(mousePosition, velocity);

//   // Schedule next particle
//   nextParticleFrame = frameCount + framesBetweenParticles;

//   // Store mouse values
//   previousParticlePosition.set(mouseX, mouseY);
// }

// // Path is a list of particles
// class Path {
//   constructor() {
//     this.particles = [];
//   }

//   addParticle(position, velocity) {
//     // Add a new particle with a position, velocity, and hue
//     let particleHue = (this.particles.length * 30) % 360;
//     this.particles.push(new Particle(position, velocity, particleHue));
//   }

//   // Update all particles
//   update() {
//     for (let particle of this.particles) {
//       particle.update();
//     }
//   }

//   // Draw a line between two particles
//   connectParticles(particleA, particleB) {
//     let opacity = particleA.framesRemaining / particleFadeFrames;
//     stroke(255, opacity);
//     line(
//       particleA.position.x,
//       particleA.position.y,
//       particleB.position.x,
//       particleB.position.y
//     );
//   }

//   // Display path
//   display() {
//     // Loop through backwards so that when a particle is removed,
//     // the index number for the next loop will match up with the
//     // particle before the removed one
//     for (let i = this.particles.length - 1; i >= 0; i -= 1) {
//       // Remove this particle if it has no frames remaining
//       if (this.particles[i].framesRemaining <= 0) {
//         this.particles.splice(i, 1);

//         // Otherwise, display it
//       } else {
//         this.particles[i].display();

//         // If there is a particle after this one
//         if (i < this.particles.length - 1) {
//           // Connect them with a line
//           this.connectParticles(this.particles[i], this.particles[i + 1]);
//         }
//       }
//     }
//   }
// }

// // Particle along a path
// class Particle {
//   constructor(position, velocity, hue) {
//     this.position = position.copy();
//     this.velocity = velocity.copy();
//     this.hue = hue;
//     this.drag = 0.95;
//     this.framesRemaining = particleFadeFrames;
//   }

//   update() {
//     // Move it
//     this.position.add(this.velocity);

//     // Slow it down
//     this.velocity.mult(this.drag);

//     // Fade it out
//     this.framesRemaining = this.framesRemaining - 1;
//   }

//   // Draw particle
//   display() {
//     let opacity = this.framesRemaining / particleFadeFrames;
//     noStroke();
//     fill(this.hue, 80, 90, opacity);
//     circle(this.position.x, this.position.y, 24);
//     star(this.position.x, this.position.y, 50, 10, 5);
//   }
// }





























// function setup() {
//   createCanvas(800, 500);
// }

// function draw() {
//   background(220);
//   // your code here

  
// // Define array to hold snowflake objects
// let snowflakes = [];



//   angleMode(DEGREES);

//   // Create snowflake objects
//   for (let i = 0; i < 300; i++) {
//     // Add a new snowflake object to the array
//     snowflakes.push(new Snowflake());
//   }

//   // Create screen reader accessible description
//   describe('Snowflakes falling on a black background.');
// }

// // function draw() {
// //   background(0);

// //   // Update and display each snowflake in the array
// //   let currentTime = frameCount / 60;

// //   for (let flake of snowflakes) {
// //     // Update each snowflake position and display
// //     flake.update(currentTime);
// //     flake.display();
// //   }
// // }

// // Define the snowflake class

// class Snowflake {
//   constructor() {
//     this.posX = 0;
//     this.posY = random(-height, 0);
//     this.initialAngle = random(0, 360);
//     this.size = random(2, 5);
//     this.radius = sqrt(random(pow(width / 2, 2)));
//     this.color = color(random(200, 256), random(200, 256), random(200, 256));
//   }

//   update(time) {
//     // Define angular speed (degrees / second)
//     let angularSpeed = 35;

//     // Calculate the current angle
//     let angle = this.initialAngle + angularSpeed * time;

//     // x position follows a sine wave
//     this.posX = width / 2 + this.radius * sin(angle);

//     // Different size snowflakes fall at different y speeds
//     let ySpeed = 8 / this.size;
//     this.posY += ySpeed;

//     // When snowflake reaches the bottom, move it to the top
//     if (this.posY > height) {
//       this.posY = -50;
//     }
//   }

//   display() {
//     fill(this.color);
//     noStroke();
//     ellipse(this.posX, this.posY, this.size);
//   }
// }
// }

