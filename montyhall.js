let carPosition;
let selectedDoor;
let revealedDoors = [];
let win;

function init() {
    // Reset variables
    carPosition = Math.floor(Math.random() * 3);
    selectedDoor = null;
    revealedDoors = [];
    win = false;

    // Reset door styles and images
    $('.door').removeClass('selected revealed').find('img').hide();

    // Clear result message
    $('#result').text('');
}

function selectDoor(doorIndex) {
    if (selectedDoor !== null) return; // Do nothing if a door is already selected

    selectedDoor = doorIndex;

    // Highlight selected door
    const selectedDoorElement = $(`#doors .door:eq(${doorIndex})`);
    selectedDoorElement.addClass('selected');

    // Reveal a goat behind one of the other doors
    for (let i = 0; i < 3; i++) {
        if (i !== selectedDoor && i !== carPosition) {
            revealedDoors.push(i);
            const revealedDoorElement = $(`#doors .door:eq(${i})`);
            revealedDoorElement.addClass('revealed');
            revealedDoorElement.find('img').attr('src', 'goat.jpg').attr('alt', 'Goat').show();
        }
    }

    // Ask the player if they want to switch doors
    setTimeout(() => {
        const switchDoors = confirm('Do you want to switch doors?');
        if (switchDoors) {
            selectedDoor = [0, 1, 2].filter(door => door !== selectedDoor && !revealedDoors.includes(door))[0];
        }

        // Determine if the player wins
        win = selectedDoor === carPosition;

        // Display result
        const resultMessage = win ? 'Congratulations! You win!' : 'Sorry! You lose!';
        $('#result').text(resultMessage);

        // If the player wins, reveal the door with the car, otherwise reveal both doors with goats
        if (win) {
            const winDoorElement = $(`#doors .door:eq(${selectedDoor})`);
            winDoorElement.find('img').attr('src', 'car.jpg').attr('alt', 'Car').show();
        } else {
            revealedDoors.forEach(door => {
                const goatDoorElement = $(`#doors .door:eq(${door})`);
                goatDoorElement.find('img').attr('src', 'goat.jpg').attr('alt', 'Goat').show();
            });
        }
    }, 1000);
}

// Initialize the game when the page loads
$(document).ready(init);
