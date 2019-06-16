export default function toOneJSONStructure(mainData, data2, data3) {
    const parkingsdata = [...mainData];
    data2.forEach((machine) => {
        parkingsdata.push(machine);
    });

    data3.forEach((machine) => {
        parkingsdata.push(machine);
    });

    return parkingsdata;
}
