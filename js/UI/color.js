// https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51
export const scheme = {
    gray: {
        brighter: "#3A6B7E",
        primary: "#264653",
        darker: "#13242A"
    },
    green: {
        brighter: "#3ECCBB",
        primary: "#2A9D8F",
        darker: "#1E7161"
    },
    yellow: {
        brighter: "#F2DCA6",
        primary: "#E9C46A",
        darker: "#E4BA4E"
    },
    orange: {
        brighter: "#F8C8A0",
        primary: "#F4A261",
        darker: "#F0852D"
    },
    red: {
        brighter: "#F0A693",
        primary: "#E76F51",
        darker: "E24D28"

    }
}

export const colors = {
    unhex: function(hex) {
        // Assume no '#'
        if (hex.length === 6) {
            const R = parseInt(hex[0] + hex[1], 16);
            const G = parseInt(hex[2] + hex[3], 16);
            const B = parseInt(hex[4] + hex[5], 16);

            return [R,G,B];
        }

        // Assume '#'
        if (hex.length === 7) {
            const R = parseInt(hex[1] + hex[2], 16);
            const G = parseInt(hex[3] + hex[4], 16);
            const B = parseInt(hex[5] + hex[6], 16);

            return [R,G,B]
        }

        throw new Error("Invalid hex string");
    }
}