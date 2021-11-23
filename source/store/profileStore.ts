import BaseStore from './storeBase.js';

export interface ProfileData {
    id?: number;
    name?: string;
    gender?: string;
    prefer?: string;
    age?: string;
    date?: string;
    description?: string;
    imgs?: string[];
    tags?: Set<string>;
    reportStatus?: string;

    apiErrorLoadCondition?: boolean;
}

const ProfileStore = new BaseStore<ProfileData>();

ProfileStore.set({
    imgs: [],

    apiErrorLoadCondition: false,
});

export { ProfileStore };
