import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Immutable from 'immutable';
import { Observable } from 'rxjs';
import { AppState } from '../../app.model';
import { Entity } from '../../models/entity/entity.model';
import {
  GameStateDeleteAction,
  GameStateSaveAction,
} from '../../models/game-state/game-state.actions';
import { GameStateService } from '../../models/game-state/game-state.service';
import { getGameParty, getGamePartyGold } from '../../models/selectors';
import { RPGGame } from '../../services/rpg-game';
import { NotificationService } from '../notification/notification.service';

export type PartyMenuStates = 'party' | 'inventory' | 'settings';

@Component({
  selector: 'party-menu',
  styleUrls: ['party-menu.component.scss'],
  templateUrl: 'party-menu.component.html',
  animations: [
    trigger('card', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('110ms', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('110ms', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
    trigger('toolbar', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('110ms', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('110ms', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
    trigger('fab', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('110ms', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)' }),
        animate('110ms', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class PartyMenuComponent {
  @Input()
  page: PartyMenuStates = 'party';
  @Input()
  open: boolean = false;

  partyGold$: Observable<number> = this.store.select(getGamePartyGold);
  party$: Observable<Immutable.List<Entity>> = this.store.select(getGameParty);

  resetGame() {
    this.store.dispatch(new GameStateDeleteAction());
  }

  saveGame() {
    this.store.dispatch(new GameStateSaveAction());
  }

  constructor(
    public game: RPGGame,
    public store: Store<AppState>,
    public gameStateService: GameStateService,
    public notify: NotificationService
  ) {}
}
