export default (category) => {
    switch (category) {
        case 'Study':
            return '#36465D'
        case 'Work':
            return '#66CCCC'
        case 'Wishlist':
            return '#00A68C'
        case 'Personal':
            return '#BFD833'
        default:
            return '#36465D'
    }

}