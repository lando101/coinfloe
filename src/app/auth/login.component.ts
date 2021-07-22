import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, UntilDestroy, untilDestroyed } from '@core';
import { AuthenticationService } from './authentication.service';
import { Container, Main } from 'tsparticles';

import { trigger, transition, useAnimation } from '@angular/animations';
import {
  bounce,
  bounceIn,
  fadeIn,
  fadeInUp,
  fadeOutDown,
  fadeOutUp,
  flip,
  flipInX,
  flipInY,
  flipOutX,
  zoomIn,
} from 'ng-animate';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return form.control.get('newPassword').value !== form.control.get('passwordVerify').value && control.dirty;
  }
}
@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeOutUp', [
      transition(':enter', [
        // useAnimation(bounceIn, {
        //   params: {
        //     timing: 0.95,
        //   },
        // }),
        useAnimation(fadeInUp, {
          params: {
            timing: 0.15,
            a: '20px',
            b: '0px',
          },
        }),
      ]),
      transition(':leave', [
        // useAnimation(fadeOutUp, {
        //   params: {
        //     timing: 0.15,
        //     a: '0px',
        //     b: '-100px',
        //   },
        // }),
        useAnimation(fadeOutDown, {
          params: {
            timing: 0.15,
            a: '0px',
            b: '60px',
          },
        }),
      ]),
    ]),
    trigger('bounceIn', [
      transition(':leave', [
        useAnimation(fadeOutDown, {
          params: {
            timing: 0.15,
            a: '0px',
            b: '60px',
          },
        }),
      ]),
      transition(':enter', [
        // useAnimation(bounceIn, {
        //   params: {
        //     timing: 0.95,
        //   },
        // }),
        useAnimation(fadeInUp, {
          params: {
            timing: 0.15,
            a: '20px',
            b: '0px',
          },
        }),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':leave', [
        useAnimation(fadeIn, {
          params: {
            timing: 0.3,
          },
        }),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  showBrand: boolean;
  showLogin = true;
  showCreate: boolean;

  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  createAccountForm!: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  model = {
    password: '',
    confirmPassword: '',
  };
  isLoading = false;

  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;
  id = 'tsparticles';

  options = {
    placement: 'left',
    password: {
      type: 'range',
      min: 8,
      max: 16,
    },
    shadow: true,
    offset: 15,
  };
  /* Starting from 1.19.0 you can use a remote url (AJAX request) to a JSON with the configuration */
  particlesUrl = 'http://foo.bar/particles.json';

  /* or the classic JavaScript object */
  particlesOptions = {
    autoPlay: true,
    background: {
      color: {
        value: 'transparent',
      },
      image: '',
      position: '',
      repeat: '',
      size: '',
      opacity: 1,
    },
    backgroundMask: {
      composite: 'destination-out',
      cover: {
        color: {
          value: 'transparent',
        },
        opacity: 1,
      },
      enable: false,
    },
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    detectRetina: true,
    fpsLimit: 60,
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onClick: {
          enable: false,
        },
        onDiv: {
          enable: false,
          type: 'circle',
        },
        onHover: {
          enable: false,
          parallax: {
            enable: false,
            force: 2,
            smooth: 10,
          },
        },
        resize: true,
      },
      modes: {
        attract: {
          distance: 200,
          duration: 0.4,
          easing: 'ease-out-quad',
          factor: 1,
          maxSpeed: 50,
          speed: 1,
        },
        bounce: {
          distance: 200,
        },
        bubble: {
          distance: 200,
          duration: 0.4,
        },
        connect: {
          distance: 80,
          links: {
            opacity: 0.5,
          },
          radius: 60,
        },
        grab: {
          distance: 100,
          links: {
            blink: false,
            consent: false,
            opacity: 1,
          },
        },
        light: {
          area: {
            gradient: {
              start: {
                value: '#ffffff',
              },
              stop: {
                value: '#000000',
              },
            },
            radius: 1000,
          },
          shadow: {
            color: {
              value: '#000000',
            },
            length: 2000,
          },
        },
        push: {
          default: true,
          quantity: 4,
        },
        remove: {
          quantity: 2,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
          easing: 'ease-out-quad',
        },
        slow: {
          factor: 3,
          radius: 200,
        },
        trail: {
          delay: 1,
          pauseOnStop: false,
          quantity: 1,
        },
      },
    },
    motion: {
      disable: false,
      reduce: {
        factor: 4,
        value: true,
      },
    },
    particles: {
      bounce: {
        horizontal: {
          random: {
            enable: false,
            minimumValue: 0.1,
          },
          value: 1,
        },
        vertical: {
          random: {
            enable: false,
            minimumValue: 0.1,
          },
          value: 1,
        },
      },
      collisions: {
        bounce: {
          horizontal: {
            random: {
              enable: false,
              minimumValue: 0.1,
            },
            value: 1,
          },
          vertical: {
            random: {
              enable: false,
              minimumValue: 0.1,
            },
            value: 1,
          },
        },
        enable: false,
        mode: 'bounce',
        overlap: {
          enable: true,
          retries: 0,
        },
      },
      color: {
        value: '#ffffff',
        animation: {
          h: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            sync: true,
          },
          s: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            sync: true,
          },
          l: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            sync: true,
          },
        },
      },
      destroy: {
        mode: 'none',
        split: {
          count: 1,
          factor: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 3,
          },
          rate: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: {
              min: 4,
              max: 9,
            },
          },
          sizeOffset: true,
        },
      },
      groups: {},
      life: {
        count: 0,
        delay: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
          sync: false,
        },
        duration: {
          random: {
            enable: false,
            minimumValue: 0.0001,
          },
          value: 0,
          sync: false,
        },
      },
      links: {
        blink: false,
        color: {
          value: '#fff',
        },
        consent: false,
        distance: 100,
        enable: false,
        frequency: 1,
        opacity: 1,
        shadow: {
          blur: 5,
          color: {
            value: '#00ff00',
          },
          enable: false,
        },
        triangles: {
          enable: false,
          frequency: 1,
        },
        width: 1,
        warp: false,
      },
      move: {
        angle: {
          offset: 0,
          value: 90,
        },
        attract: {
          distance: 200,
          enable: false,
          rotate: {
            x: 3000,
            y: 3000,
          },
        },
        decay: 0,
        distance: {},
        direction: 'none',
        drift: 0,
        enable: true,
        gravity: {
          acceleration: 9.81,
          enable: false,
          inverse: false,
          maxSpeed: 50,
        },
        path: {
          clamp: true,
          delay: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 0,
          },
          enable: false,
        },
        outModes: {
          default: 'destroy',
          bottom: 'destroy',
          left: 'destroy',
          right: 'destroy',
          top: 'destroy',
        },
        random: false,
        size: true,
        speed: 5,
        straight: false,
        trail: {
          enable: true,
          length: 3,
          fillColor: {
            value: 'transparent',
          },
        },
        vibrate: false,
        warp: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
          factor: 2000,
        },
        limit: 0,
        value: 0,
      },
      opacity: {
        random: {
          enable: false,
          minimumValue: 1,
        },
        value: {
          min: 1,
          max: 1,
        },
        animation: {
          count: 0,
          enable: false,
          speed: 2,
          sync: false,
          destroy: 'none',
          minimumValue: 0,
          startValue: 'random',
        },
      },
      reduceDuplicates: false,
      roll: {
        darken: {
          enable: false,
          value: 0,
        },
        enable: false,
        enlighten: {
          enable: false,
          value: 0,
        },
        speed: 25,
      },
      rotate: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 0,
        animation: {
          enable: false,
          speed: 0,
          sync: false,
        },
        direction: 'clockwise',
        path: false,
      },
      shadow: {
        blur: 0,
        color: {
          value: '#000000',
        },
        enable: false,
        offset: {
          x: 0,
          y: 0,
        },
      },
      // shape: {
      //   options: {
      //     character: {
      //       fill: false,
      //       font: 'Verdana',
      //       style: '',
      //       value: '*',
      //       weight: '400',
      //     },
      //     char: {
      //       fill: false,
      //       font: 'Verdana',
      //       style: '',
      //       value: '*',
      //       weight: '400',
      //     },
      //     polygon: {
      //       sides: 5,
      //     },
      //     star: {
      //       sides: 5,
      //     },
      //     image: [
      //       {
      //         src: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=010',
      //         width: 300,
      //         height: 300,
      //       },
      //       {
      //         src: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=010',
      //         width: 250,
      //         height: 250,
      //       },
      //       {
      //         src: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=010',
      //         width: 250,
      //         height: 250,
      //       },
      //       {
      //         src: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=010',
      //         width: 250,
      //         height: 250,
      //       },
      //     ],
      //     images: [
      //       {
      //         src: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=010',
      //         width: 300,
      //         height: 300,
      //       },
      //       {
      //         src: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=010',
      //         width: 250,
      //         height: 250,
      //       },
      //       {
      //         src: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=010',
      //         width: 250,
      //         height: 250,
      //       },
      //       {
      //         src: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=010',
      //         width: 250,
      //         height: 250,
      //       },
      //     ],
      //   },
      //   type: 'image',
      // },
      // size: {
      //   random: {
      //     enable: false,
      //     minimumValue: 1,
      //   },
      //   value: {
      //     min: 5,
      //     max: 10,
      //   },
      //   animation: {
      //     count: 0,
      //     enable: false,
      //     speed: 5,
      //     sync: false,
      //     destroy: 'none',
      //     minimumValue: 0,
      //     startValue: 'random',
      //   },
      // },
      shape: {
        options: {},
        type: 'circle',
      },
      size: {
        random: {
          enable: false,
          minimumValue: 1,
        },
        value: {
          min: 1,
          max: 10,
        },
        animation: {
          count: 0,
          enable: false,
          speed: 5,
          sync: false,
          destroy: 'none',
          minimumValue: 0,
          startValue: 'random',
        },
      },
      stroke: {
        width: 0,
      },
      tilt: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 0,
        animation: {
          enable: false,
          speed: 0,
          sync: false,
        },
        direction: 'clockwise',
        enable: false,
      },
      twinkle: {
        lines: {
          enable: false,
          frequency: 0.05,
          opacity: 1,
        },
        particles: {
          enable: false,
          frequency: 0.05,
          opacity: 1,
        },
      },
      wobble: {
        distance: 5,
        enable: false,
        speed: 50,
      },
      zIndex: {
        random: {
          enable: false,
          minimumValue: 0,
        },
        value: 0,
        opacityRate: 1,
        sizeRate: 1,
        velocityRate: 1,
      },
    },
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    emitters: {
      autoPlay: true,
      life: {},
      rate: {
        quantity: 10,
        delay: 0.25,
      },
      size: {
        mode: 'percent',
        height: 0,
        width: 0,
      },
      direction: 'none',
      position: {
        x: 50,
        y: 50,
      },
      spawnColor: {
        value: '#ff0000',
        animation: {
          h: {
            count: 0,
            enable: true,
            offset: 0,
            speed: 5,
            sync: true,
          },
          s: {
            count: 0,
            enable: false,
            offset: 0,
            speed: 1,
            sync: true,
          },
          l: {
            count: 0,
            enable: true,
            offset: {
              min: 20,
              max: 80,
            },
            speed: 0,
            sync: true,
          },
        },
      },
    },
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
    this.createNewAccountForm();
  }

  ngOnInit() {
    setTimeout(() => {
      this.showBrand = true;
    }, 300);
    this.myStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      'z-index': 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 150,
        },
        color: {
          value: '#ff0000',
        },
        shape: {
          type: 'triangle',
        },
      },
    };
  }
  particlesLoaded(container: Container): void {
    console.log(container);
  }

  particlesInit(main: Main): void {
    console.log(main);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
  }
  login(signInMethod: string) {
    const method: string = signInMethod;
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value, method);

    if (method === 'email') {
      login$
        .pipe(
          finalize(() => {
            this.loginForm.markAsPristine();
            this.isLoading = false;
          }),
          untilDestroyed(this)
        )
        .subscribe(
          (credentials) => {
            // log.debug(`${credentials.username} successfully logged in`);
            this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          },
          (error) => {
            // log.debug(`Login error: ${error}`);
            this.error = error;
          }
        );
    } else if (method === 'google') {
      login$
        .pipe(
          finalize(() => {
            this.loginForm.markAsPristine();
            this.isLoading = false;
          }),
          untilDestroyed(this)
        )
        .subscribe(
          (credentials) => {
            // log.debug(`${credentials.username} successfully logged in`);
            this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
          },
          (error) => {
            // log.debug(`Login error: ${error}`);
            this.error = error;
          }
        );
    }
  }
  create(createMethod: string) {
    const method: string = createMethod;
    this.isLoading = true;
    const create$ = this.authenticationService.createAccount(this.createAccountForm.value, method);

    create$
      .pipe(
        finalize(() => {
          this.createAccountForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (data: any) => {
          console.log('FB Result login component');
          console.log(data);
          console.log('FB Result login component');
        },
        (error) => {
          this.error = error;
        }
      );
  }
  toggleLogin(type: number) {
    if (type === 0) {
      // show new account
      this.showLogin = false;
      setTimeout(() => {
        this.showCreate = true;
      }, 390);
      // 165
    } else if (type === 1) {
      // show login
      this.showCreate = false;
      setTimeout(() => {
        this.showLogin = true;
      }, 390);
      // 165
    }
  }
  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }

  private createNewAccountForm() {
    this.createAccountForm = this.formBuilder.group(
      {
        newUsername: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
        email: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(64)]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.maxLength(this.options.password.max),
            Validators.minLength(this.options.password.min),
          ],
        ],
        passwordVerify: ['', Validators.required],
      },
      {
        validator: this.passwordValidator,
      }
    );
  }
  private passwordValidator(form: FormGroup) {
    const condition = form.get('newPassword').value !== form.get('passwordVerify').value;

    return condition ? { passwordsDoNotMatch: true } : null;
  }
}
