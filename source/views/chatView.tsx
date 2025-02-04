import ViewBase from './viewBase.js';
import { viewSizes } from '../constants/viewParams.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Chat } from '../components/chat/chat.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';
import { ChatsStore, chatsManager } from '../store/chatsStore.js';
import ReportsStore from '../store/reportsStore.js';
import { CardExpended } from '../components/card/cardExpended.js';
import { Errors } from '../components/error/errors.js';
import { EVENTS } from '../dispatcher/events.js';
import EventBus from '../dispatcher/eventBus.js';

export default class ChatView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        this.viewSize = viewSizes.slim;
        ChatsStore.subscribe(this.chatUpdatesView, this);
        ReportsStore.subscribe(this.reportsSubscribtionCallback, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        this._template = this._createTmpl(this._data);
    }

    public unsubscribe() {
        ChatsStore.unsubscribe(this.chatUpdatesView);
        ReportsStore.unsubscribe(this.reportsSubscribtionCallback);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    _data = {
        chat: chatsManager.chat,
        reports: ReportsStore.get().reports,
        reportsActive: ReportsStore.get().active,
        error: errorManager.error,
    };

    _createTmpl(data) {
        if (!data.chat || !data.chat.profile || !data.chat.isOpenedProfile) {
            return (
                <div class='app__content--align-center'>
                    {Chat(data.chat, false)}
                    {Errors(data.error)}
                </div>
            );
        } else {
            return (
                <div class='app__content--align-center'>
                    <div class='profile'>
                        <div class='profile__card'>
                            <button
                                type='button'
                                onclick={() => {
                                    EventBus.dispatch<number>(EVENTS.CHAT_BACK_TO_CHAT_BUTTON, data.chat.profile.id);
                                }}
                                class='back-button'
                            >
                                <img src='icons/back.svg' class='back-button__icon-medium' />
                                <span class='back-button__text'>Назад</span>
                            </button>
                            {CardExpended({
                                userData: data.chat.profile,
                                withActions: false,
                                withReports: true,
                                withBackButton: true,
                                reports: data.reports,
                                reported: data.reportsActive,
                            })}
                        </div>
                        {Errors(data.error)}
                    </div>
                </div>
            );
        }
    }

    private chatUpdatesView(data, view) {
        view._data.chat = chatsManager.chat;

        view._template = view._createTmpl(view._data);

        view.render();

        if (!view._data.chat || !view._data.chat.profile || !view._data.chat.isOpenedProfile) {
            const _chatSpace = document.getElementsByClassName('chat__messages')[0];
            if (_chatSpace) {
                _chatSpace.scrollTop = _chatSpace.scrollHeight;
            }
            const _inputMsg = document.getElementsByTagName('input')[0];
            if (_inputMsg) {
                _inputMsg.focus();
            }
        } else {
            const _cardProfile = document.getElementsByClassName('card-profile')[0];
            if (_cardProfile) {
                _cardProfile.scrollTop = 0;
            }
        }
    }

    private reportsSubscribtionCallback(data, view) {
        view._data.reports = data.reports;
        view._data.reportsActive = data.active;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.error = errorManager.error;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
