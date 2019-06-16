export default function ascendArray(a, b) {
    if (a.onFootDistance < b.onFootDistance) {
        return -1;
    }
    if (a.onFootDistance > b.onFootDistance) {
        return 1;
    }
    return 0;
}
