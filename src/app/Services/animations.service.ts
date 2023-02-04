import { Injectable, Input } from '@angular/core';
import { AnimationBuilder, AnimationMetadata, AnimationPlayer } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  
  @Input() label?: string;

  @Input() animations: { [name: string]: AnimationMetadata } = {};

  @Input() params: {
    [name: string]: unknown;
  } = {};

  lastAnimPlayer?: AnimationPlayer;
  constructor(private readonly animationBuilder: AnimationBuilder,) { }

  playAnim(
    element: HTMLElement,
    anim: AnimationMetadata | AnimationMetadata[]
  ): void {
    this.lastAnimPlayer?.finish();

    const animPlayer = this.animationBuilder
      .build(anim)
      .create(element, { params: { ...this.params } });

    animPlayer.init();
    animPlayer.onDone(() => {
      animPlayer.destroy();
      if (animPlayer === this.lastAnimPlayer) {
        this.lastAnimPlayer = undefined;
      }
    });
    this.lastAnimPlayer = animPlayer;
    animPlayer.play();
  }
}

/*
https://jiayihu.github.io/ng-animate/
*/