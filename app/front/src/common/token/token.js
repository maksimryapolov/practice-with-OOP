export const tokenStorage = {
    key: "token",

    /**
     * @param dataStorage
     */
    set(dataStorage) {
        if(dataStorage.token) {
            let key = dataStorage.key ?? this.key;
            localStorage.setItem(key, dataStorage.token);
        }
    },

    /**
     * @param key
     */
    remove(key = this.key) {
        if(key) {
            localStorage.removeItem(key);
        }
    }
}
