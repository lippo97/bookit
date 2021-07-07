export default interface Error<K> {
    readonly kind: K;
    readonly description?: string;
}