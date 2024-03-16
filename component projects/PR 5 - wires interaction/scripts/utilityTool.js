class UtilityTool {
    // Is point inside Box
    isInsideBox(point, box) {
        return point.x > box.x &&
            point.x < box.x + box.width &&
            point.y > box.y &&
            point.y < box.y + box.height
    }    
}

export default UtilityTool