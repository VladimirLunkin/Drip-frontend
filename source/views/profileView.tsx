import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar.js';
import { CardExpended } from '../components/cardExpended.js';
import { ProfileStore } from '../store/profileStore.js';
import EventBus from '../dispatcher/eventBus.js';
import TapbarStore from '../store/tapbarStore.js';

export default class ProfileView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);

        ProfileStore.subscribe(this.subcribtionCallback, this);
        this._template = this._createTmpl(this._data);
    }

    _data = {
        'cardData': {
            'userData': {
                name: ProfileStore.get().name,
                age: ProfileStore.get().age,
                description: ProfileStore.get().description,
                imgs: ProfileStore.get().imgs,
            },
            'tags': ProfileStore.get().tags,
            'buttons': {
                'logoutButton': {
                    type: 'button',
                    src: 'icons/button_previous_white.svg',
                    class: 'menu-icon',
                    onclick: () => {
                        EventBus.dispatch<string>('profile:logout-button');
                    },
                },
                'editButton': {
                    type: 'button',
                    src: 'icons/button_edit_white.svg',
                    class: 'menu-icon',
                    onclick: () => {
                        EventBus.dispatch<string>('profile:edit-button');
                    },
                },
            },
        },
        'tapbar': {
            class: 'menu-icon',
        },
    };

    _createTmpl(data) {
        return (
            <div class='card-container'>
                {CardExpended(this._data.cardData)}
                {Tapbar(TapbarStore.get())}
            </div>
        );
    }

    public unsubscribe() {
        ProfileStore.unsubscribe(this.subcribtionCallback);
    }

    private subcribtionCallback(data, view) {
        view._data.cardData.userData.name = data.name;
        view._data.cardData.userData.age = data.age;
        view._data.cardData.userData.description = data.description;
        view._data.cardData.tags = data.tags;
        view._template = view._createTmpl(view._data);
        view.render();
    }
    public forceRender() {
        ProfileStore.subscribe(this.subcribtionCallback, this);
        this._template = this._createTmpl(this._data);
        this.render();
    }
}
