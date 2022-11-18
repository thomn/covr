/**
 *
 * @param entry
 */
const useLocalStorage = (entry: string) => {
    const namespace = 'covr';

    /**
     *
     * @param key
     * @returns {null|*}
     */
    const load = <T> (key: string): T => {
        const json = localStorage.getItem(namespace) || '{}';
        const store = JSON.parse(json);
        const {[entry]: context} = store;

        if (!context) {
            return null;
        }

        return (key)
            ? context[key]
            : context
        ;
    };

    /**
     *
     * @param key
     * @param value
     */
    const save = (key: string, value: object | string | number | boolean) => {
        const json = localStorage.getItem(namespace) || '{}';
        const store = JSON.parse(json);

        if (!store[entry]) {
            store[entry] = {};
        }

        store[entry][key] = value;

        const string = JSON.stringify(store);
        localStorage.setItem(namespace, string);
    };

    return {
        load,
        save,
    };
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 07.06.2019
 * Time: 18:09
 */
export default useLocalStorage;
