export default function compare(a, b) {
    if (a.distance_to_destination < b.distance_to_destination) {
        return -1;
    }
    if (a.distance_to_destination > b.distance_to_destination) {
        return 1;
    }
    return 0;
}
