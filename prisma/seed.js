// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  // cabins 
  const farmhouse = await prisma.Cabin.create({
    data: {
      name: 'Farmhouse',
      videoUrl: 'https://youtube.com/embed/kFmoTPF2UEQ&pp=ygUbQm9yZWxhbmQgbG9jaCB0YXkgZmFybWhvdXNl',
      imageFileName: 'farmhouse.jpg',
      capacity: 18, 
      roomCount: 6, 
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 3', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 4', roomType: 'Double/Twin and Bunk', capacity: 4, enSuite: false },
          { name: 'Room 5', roomType: 'Double/Twin and Bunk', capacity: 4, enSuite: false },
          { name: 'Room 6', roomType: 'Double/Twin and Bunk', capacity: 4, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const longhouse = await prisma.Cabin.create({
    data: {
      name: 'Longhouse',
      videoUrl: "https://youtube.com/embed/AGobMia64XM&pp=ygUbQm9yZWxhbmQgbG9jaCB0YXkgbG9uZ2hvdXNl",
      imageFileName: 'longhouse.jpg',
      capacity: 8,
      roomCount: 4,
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double/twin', capacity: 2, enSuite: false },
          { name: 'Room 2', roomType: 'Double/twin', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Double/twin', capacity: 2, enSuite: false },
          { name: 'Room 4', roomType: 'Double/twin', capacity: 2, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const benCruachan = await prisma.Cabin.create({
    data: {
      name: 'Ben Cruachan',
      videoUrl: "https://youtube.com/embed/5v5DUIyRBNk&pp=ygUeYm9yZWxhbmQgbG9jaCB0YXkgc2NoaWVoYWxsaW9u",
      imageFileName: 'benCruachan.jpg',
      capacity: 10,
      roomCount: 4,
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 3', roomType: 'Double/Twin', capacity: 2, enSuite: false },
          { name: 'Room 4', roomType: 'Double/Twin And Bunk', capacity: 4, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const schiehallion = await prisma.Cabin.create({
    data: {
      name: 'Schiehallion',
      videoUrl: "https://youtube.com/embed/5v5DUIyRBNk&pp=ygUeQm9yZWxhbmQgbG9jaCB0YXkgc2NoaWVoYWxsaW9u",
      imageFileName: 'schiehallion.jpg',
      capacity: 10, 
      roomCount: 4,
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double/Twin', capacity: 2, enSuite: false },
          { name: 'Room 2', roomType: 'Double/Twin', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Double/Twin And Bunk', capacity: 4, enSuite: false },
          { name: 'Room 4', roomType: 'Double/Twin', capacity: 2, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const benDrummond = await prisma.Cabin.create({
    data: {
      name: 'Ben Drummond',
      videoUrl: "https://youtube.com/embed/ti_-jLmQrII&pp=ygUaQm9yZWxhbmQgbG9jaCB0YXkgZHJ1bW1vbmQ%3D",
      imageFileName: 'benDrummond.jpeg',
      capacity: 8,
      roomCount: 3,
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double/Twin', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Double/Twin Bunk', capacity: 4, enSuite: false }

        ]
      }
    },
    include: { rooms: true }
  });

  const benLawers = await prisma.Cabin.create({
    data: {
      name: 'Ben Lawers',
      videoUrl: "https://youtube.com/embed/ti_-jLmQrII&pp=ygUaQm9yZWxhbmQgbG9jaCB0YXkgZHJ1bW1vbmQ%3D",
      imageFileName: 'benLawers.jpg',
      capacity: 8,
      roomCount: 3,
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double/Twin', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double/Twin', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Double Bunk', capacity: 4, enSuite: false }

        ]
      }
    },
    include: { rooms: true }
  });

  const cottage = await prisma.Cabin.create({
    data: {
      name: 'Cottage',
      videoUrl: "https://youtube.com/embed/zxve8-GkZRU&pp=ygUZQm9yZWxhbmQgbG9jaCB0YXkgY290dGFnZQ%3D%3D",
      imageFileName: 'cottage.jpg',
      capacity: 8,
      roomCount: 3,
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double + Daybed', capacity: 3, enSuite: true },
          { name: 'Room 2', roomType: 'Double + Daybed', capacity: 3, enSuite: false },
          { name: 'Room 3', roomType: 'Bunk', capacity: 2, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  //guests
  const joeAndLaura = await prisma.GuestParty.create({
    data: {
      partyName: 'Joe & Laura',
      token: 'joeAndLaura',
      guestType: 'OnSite',
      inviteCode: 'jir6',
      accommodationCost: 30000,
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Joe',
            lastName: 'Austin',
            room: {connect: {id: farmhouse.rooms[0].id}},
            relation: 'Groom'
          },
          {
            firstName: 'Laura',
            lastName: 'Smith',
            room: { connect: { id: farmhouse.rooms[0].id } },
            relation: 'Bride'
          }
        ]
      }
    }
  });

  const sonnyAndBecca = await prisma.GuestParty.create({
    data: {
      partyName: 'Sonny & Becca',
      token: 'sonnyAndBecca',
      guestType: 'OnSite',
      inviteCode: 'oh7k',
      accommodationCost: 30000,
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Sonny',
            lastName: 'Cannon',
            room: { connect: { id: farmhouse.rooms[1].id } },
            relation: 'Best Man'
          },
          {
            firstName: 'Becca',
            lastName: 'Roberts',
            room: { connect: { id: farmhouse.rooms[1].id } },
            relation: 'Maid Of Honour'
          }
        ]
      }
    }
  });

  const jayAndBecky = await prisma.GuestParty.create({
    data: {
      partyName: 'Jay & Becky',
      token: 'jayAndBecky',
      guestType: 'OnSite',
      inviteCode: '4yhb',
      accommodationCost: 30000,
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Jay',
            lastName: '',
            room: { connect: { id: farmhouse.rooms[2].id } },
            relation: 'Friend Of The Couple'
          },
          {
            firstName: 'Becky',
            lastName: '',
            room: { connect: { id: farmhouse.rooms[2].id } },
            relation: 'Bridesmade'
          }
        ]
      }
    }
  });

  const tomAndToni = await prisma.GuestParty.create({
    data: {
      partyName: 'Tom & Toni',
      token: 'tomAndToni',
      guestType: 'OnSite',
      inviteCode: '8fg0',
      accommodationCost: 22000,
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Tom',
            lastName: 'Speakman',
            room: { connect: { id: farmhouse.rooms[3].id } },
             relation: 'Friend Of The Couple'
          },
          {
            firstName: 'Toni',
            lastName: 'Abblitt',
            room: { connect: { id: farmhouse.rooms[3].id } },
             relation: 'Friend Of The Couple'
          },
          {
            firstName: 'Renly',
            lastName: 'Speakman',
            isBaby: true,
            room: { connect: { id: farmhouse.rooms[3].id } },
             relation: 'Friend Of The Couples Baby'
          }
        ]
      }
    }
  });

  const connorAndEllie = await prisma.GuestParty.create({
    data: {
      partyName: 'Connor & Ellie',
      token: 'connorAndEllie',
      guestType: 'OnSite',
      inviteCode: '2jiu',
      accommodationCost: 22000,
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Connor',
            lastName: 'Costello',
            room: { connect: { id: farmhouse.rooms[3].id } },
             relation: 'Friend Of The Couple'
          },
          {
            firstName: 'Ellie',
            lastName: 'Van',
            room: { connect: { id: farmhouse.rooms[3].id } },
             relation: 'Bridesmaid'
          }
        ]
      }
    }
  });

  const grahamAndPuja = await prisma.GuestParty.create({
    data: {
      partyName: 'Graham & Puja',
      token: 'grahamAndPuja',
      guestType: 'OnSite',
      inviteCode: 'x6mp',
      accommodationCost: 22000,
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Graham',
            lastName: 'Frain',
            room: { connect: { id: farmhouse.rooms[4].id } },
             relation: 'Friend Of The Couple'
          },
          {
            firstName: 'Puja',
            lastName: 'Biswas',
            room: { connect: { id: farmhouse.rooms[4].id } },
             relation: 'Friend Of The Couples Partner'
          }
        ]
      }
    }
  });

  const seanAndKim = await prisma.GuestParty.create({
    data: {
      partyName: 'Sean & Kim',
      token: 'seanAndKim',
      guestType: 'OnSite',
      inviteCode: '0gh3',
      accommodationCost: 22000,
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Sean',
            lastName: 'Boardman',
            room: { connect: { id: farmhouse.rooms[4].id } },
             relation: 'Groomsmen'
          },
          {
            firstName: 'Kim',
            lastName: '',
            room: { connect: { id: farmhouse.rooms[4].id } },
             relation: 'Friend Of The Couple'
          }
        ]
      }
    }
  });

  const maddieAndNatasha = await prisma.GuestParty.create({
    data: {
      partyName: 'Maddie & Natasha',
      token: 'maddieAndNatasha',
      guestType: 'OnSite',
      inviteCode: '5msi',
      accommodationCost: 22000,
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Madeline',
            lastName: 'Austin',
            room: { connect: { id: farmhouse.rooms[5].id } },
             relation: 'Sister Of The Groom'
          },
          {
            firstName: 'Natasha',
            lastName: '',
            room: { connect: { id: farmhouse.rooms[5].id } },
             relation: 'Friend Of The Couple'
          }
        ]
      }
    }
  });

  const barry = await prisma.GuestParty.create({
    data: {
      partyName: 'Barry',
      token: 'barry',
      guestType: 'OnSite',
      inviteCode: 'nm1p',
      accommodationCost: 11000,
      cabin: {
        connect: { id: farmhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Barry',
            lastName: '',
            room: { connect: { id: farmhouse.rooms[5].id } },
             relation: 'Friend Of The Couple'
          },
        ]
      }
    }
  });

  const markAndHelen = await prisma.GuestParty.create({
    data: {
      partyName: 'Mark & Helen',
      token: 'markAndHelen',
      guestType: 'OnSite',
      inviteCode: '4bg7',
      accommodationCost: 26000,
      cabin: {
        connect: { id: longhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Mark',
            lastName: 'Walters',
            room: { connect: { id: longhouse.rooms[0].id } },
             relation: 'Friend Of The Couple'
          },
          {
            firstName: 'Helen',
            lastName: 'Walters',
            room: { connect: { id: longhouse.rooms[0].id } },
             relation: 'Friend Of The Couple'
          }
        ]
      }
    }
  });

  const jakeAndAnthia = await prisma.GuestParty.create({
    data: {
      partyName: 'Jake & Anthia',
      token: 'jakeAndAnthia',
      guestType: 'OnSite',
      inviteCode: 'b58x',
      accommodationCost: 26000,
      cabin: {
        connect: { id: longhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Jake',
            lastName: 'Wright',
            room: { connect: { id: longhouse.rooms[1].id } },
             relation: 'Colleague'
          },
          {
            firstName: 'Anthia',
            lastName: '',
            room: { connect: { id: longhouse.rooms[1].id } },
              relation: 'Colleagues Partner'
          }
        ]
      }
    }
  });

  const leeAndAlly = await prisma.GuestParty.create({
    data: {
      partyName: 'Lee & Ally',
      token: 'leeAndAlly',
      guestType: 'OnSite',
      inviteCode: '9i4o',
      accommodationCost: 26000,
      cabin: {
        connect: { id: longhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Lee',
            lastName: 'Hancock',
            room: { connect: { id: longhouse.rooms[2].id } },
             relation: 'Friend Of The Couple'
          },
          {
            firstName: 'Ally',
            lastName: 'Hancock',
            room: { connect: { id: longhouse.rooms[2].id } },
             relation: 'Friend Of The Couple'
          }
        ]
      }
    }
  });

  const peteAndCynthia = await prisma.GuestParty.create({
    data: {
      partyName: 'Pete & Cynthia',
      token: 'peteAndCynthia',
      guestType: 'OnSite',
      inviteCode: 'c2g6',
      accommodationCost: 26000,
      cabin: {
        connect: { id: longhouse.id }
      },
      guests: {
        create: [
          {
            firstName: 'Pete',
            lastName: '',
            room: { connect: { id: longhouse.rooms[3].id } },
             relation: 'Family Of The Groom'
          },
          {
            firstName: 'Cynthia',
            lastName: '',
            room: { connect: { id: longhouse.rooms[3].id } },
             relation: 'Family Of The Groom'
          }
        ]
      }
    }
  });

  const nigelAndRuth = await prisma.GuestParty.create({
    data: {
      partyName: 'Nigel & Ruth',
      token: 'nigelAndRuth',
      guestType: 'OnSite',
      inviteCode: 'k56p',
      accommodationCost: 30000,
      cabin: {
        connect: { id: benCruachan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Nigel',
            lastName: 'Austin',
            room: { connect: { id: benCruachan.rooms[0].id } },
             relation: 'Farther Of The Groom'
          },
          {
            firstName: 'Ruth',
            lastName: 'Austin',
            room: { connect: { id: benCruachan.rooms[0].id } },
             relation: 'Mother Of The Groom'
          }
        ]
      }
    }
  });

  const mikeAndAnne = await prisma.GuestParty.create({
    data: {
      partyName: 'Mike & Anne',
      token: 'mikeAndAnne',
      guestType: 'OnSite',
      inviteCode: '4gf5',
      accommodationCost: 30000,
      cabin: {
        connect: { id: benCruachan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Mike',
            lastName: 'Austin',
            room: { connect: { id: benCruachan.rooms[1].id } },
             relation: 'Grand Farther Of The Groom'
          },
          {
            firstName: 'Anne',
            lastName: 'Austin',
            room: { connect: { id: benCruachan.rooms[1].id } },
             relation: 'Grand Mother Of The Groom'
          }
        ]
      }
    }
  });

  const mikeAndEllen = await prisma.GuestParty.create({
    data: {
      partyName: 'Mike & Ellen',
      token: 'mikeAndEllen',
      guestType: 'OnSite',
      inviteCode: '7cvt',
      accommodationCost: 26000,
      cabin: {
        connect: { id: benCruachan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Mike',
            lastName: 'Downey',
            room: { connect: { id: benCruachan.rooms[2].id } },
             relation: 'Friend Of The Couple'
          },
          {
            firstName: 'Ellen',
            lastName: 'Downey',
            room: { connect: { id: benCruachan.rooms[2].id } },
            relation: 'Friend Of The Couple'
          }
        ]
      }
    }
  });

  const david = await prisma.GuestParty.create({
    data: {
      partyName: 'David',
      token: 'david',
      guestType: 'OnSite',
      inviteCode: 'drg4',
      accommodationCost: 11000,
      cabin: {
        connect: { id: benCruachan.id }
      },
      guests: {
        create: [
          {
            firstName: 'David',
            lastName: 'Austin',
            room: { connect: { id: benCruachan.rooms[3].id } },
            relation: 'Family Of The Groom'
          },
        ]
      }
    }
  });

  const steven = await prisma.GuestParty.create({
    data: {
      partyName: 'Steven',
      token: 'steven',
      guestType: 'OnSite',
      inviteCode: '76gj',
      accommodationCost: 11000,
      cabin: {
        connect: { id: benCruachan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Steven',
            lastName: 'Austin',
            room: { connect: { id: benCruachan.rooms[3].id } },
            relation: 'Family Of The Groom'
          },
        ]
      }
    }
  });

  const tom = await prisma.GuestParty.create({
    data: {
      partyName: 'Tom',
      token: 'tom',
      guestType: 'OnSite',
      inviteCode: 'c90l',
      accommodationCost: 11000,
      cabin: {
        connect: { id: benCruachan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Tom',
            lastName: 'Downey',
            room: { connect: { id: benCruachan.rooms[3].id } },
            relation: 'Friend Of The Couple'
          },
        ]
      }
    }
  });

  const georgeAndRebecca = await prisma.GuestParty.create({
    data: {
      partyName: 'George & Rebecca',
      token: 'georgeAndRebecca',
      guestType: 'OnSite',
      inviteCode: '46vy',
      accommodationCost: 30000,
      cabin: {
        connect: { id: schiehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'George',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[0].id } },
            relation: 'God Farther Of The Bride'
          },
          {
            firstName: 'Rebecca',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[0].id } },
            relation: 'God Mother Of The Bride'
          }
        ]
      }
    }
  });

  const eddieAndMaureen = await prisma.GuestParty.create({
    data: {
      partyName: 'Eddie & Maureen',
      token: 'eddieAndMaureen',
      guestType: 'OnSite',
      inviteCode: 'zv60',
      accommodationCost: 30000,
      cabin: {
        connect: { id: schiehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'Eddie',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[1].id } },
            relation: 'Family Of The Bride'
          },
          {
            firstName: 'Maureen',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[1].id } },
           relation: 'Family Of The Bride'
          }
        ]
      }
    }
  });

  const kevinAndLynn = await prisma.GuestParty.create({
    data: {
      partyName: 'Kevin & Lynn',
      token: 'kevinAndLynn',
      guestType: 'OnSite',
      inviteCode: '0ba3',
      accommodationCost: 22000,
      cabin: {
        connect: { id: schiehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'Kevin',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[2].id } },
            relation: 'Family Of The Bride'
          },
          {
            firstName: 'Lynn',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[2].id } },
            relation: 'Family Of The Bride'
          }
        ]
      }
    }
  });

  const cieranAndChole = await prisma.GuestParty.create({
    data: {
      partyName: 'Cieran & Chloe',
      token: 'cieranAndChole',
      guestType: 'OnSite',
      inviteCode: 'j8s4',
      accommodationCost: 22000,
      cabin: {
        connect: { id: schiehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'Cieran',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[2].id } },
            relation: 'Family Of The Bride'
          },
          {
            firstName: 'Chloe',
            lastName: '',
            room: { connect: { id: schiehallion.rooms[2].id } },
            relation: 'Family Of The Bride'
          }
        ]
      }
    }
  });

  const johnAndAndrea = await prisma.GuestParty.create({
    data: {
      partyName: 'John & Andrea',
      token: 'johnAndAndrea',
      guestType: 'OnSite',
      inviteCode: 'k8z3',
      accommodationCost: 30000,
      cabin: {
        connect: { id: schiehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'John',
            lastName: 'Scott',
            room: { connect: { id: schiehallion.rooms[3].id } },
            relation: 'Family Of The Groom'
          },
          {
            firstName: 'Andrea',
            lastName: 'Scott',
            room: { connect: { id: schiehallion.rooms[3].id } },
            relation: 'Family Of The Groom'
          }
        ]
      }
    }
  });

  const dougieAndMaria = await prisma.GuestParty.create({
    data: {
      partyName: 'Dougie & Maria',
      token: 'dougieAndMaria',
      guestType: 'OnSite',
      inviteCode: 'f57n',
      accommodationCost: 30000,
      cabin: {
        connect: { id: benDrummond.id }
      },
      guests: {
        create: [
          {
            firstName: 'Dougie',
            lastName: 'Smith',
            room: { connect: { id: benDrummond.rooms[0].id } },
            relation: 'Farther Of The Bride'
          },
          {
            firstName: 'Maria',
            lastName: 'Smith',
            room: { connect: { id: benDrummond.rooms[0].id } },
            relation: 'Mother Of The Bride'
          }
        ]
      }
    }
  });

  const rossAndNicci = await prisma.GuestParty.create({
    data: {
      partyName: 'Ross & Nicci',
      token: 'rossAndNicci',
      guestType: 'OnSite',
      inviteCode: 'b0pl',
      accommodationCost: 30000,
      cabin: {
        connect: { id: benDrummond.id }
      },
      guests: {
        create: [
          {
            firstName: 'Ross',
            lastName: 'Mitchall',
            room: { connect: { id: benDrummond.rooms[1].id } },
            relation: 'Family Of The Bride'
          },
          {
            firstName: 'Nicci',
            lastName: 'Mitchall',
            room: { connect: { id: benDrummond.rooms[1].id } },
            relation: 'Sister Of The Bride'
          },
          {
            firstName: 'Jaxson',
            lastName: 'Mitchall',
            isChild: true,
            room: { connect: { id: benDrummond.rooms[2].id } },
            relation: 'Family Of The Bride'
          },
          {
            firstName: 'Jenson',
            lastName: 'Mitchall',
            isChild: true,
            room: { connect: { id: benDrummond.rooms[2].id } },
            relation: 'Family Of The Bride'
          },
          {
            firstName: 'Skye',
            lastName: 'Mitchall',
            isChild: true,
            room: { connect: { id: benDrummond.rooms[2].id } },
            relation: 'Family Of The Bride'
          }
        ]
      }
    }
  });

  const ryanAndVicky = await prisma.GuestParty.create({
    data: {
      partyName: 'Ryan & Vicky',
      token: 'ryanAndVicky',
      guestType: 'OnSite',
      inviteCode: 'z16f',
      accommodationCost: 30000,
      cabin: {
        connect: { id: benLawers.id }
      },
      guests: {
        create: [
          {
            firstName: 'Ryan',
            lastName: '',
            room: { connect: { id: benLawers.rooms[0].id } },
            relation: 'Family Of The Bride'
          },
          {
            firstName: 'Vicky',
            lastName: '',
            room: { connect: { id: benLawers.rooms[0].id } },
            relation: 'Family Of The Bride'
          },
          {
            firstName: 'Mimi-Rose',
            lastName: '',
            isBaby: true,
            room: { connect: { id: benLawers.rooms[0].id } },
            relation: 'Family Of The Bride'
          },
          {
            firstName: 'Milo',
            lastName: '',
            isChild: true,
            room: { connect: { id: benLawers.rooms[2].id } },
            relation: 'Family Of The Bride'
          },
          {
            firstName: 'Macie',
            lastName: '',
            isChild: true,
            room: { connect: { id: benLawers.rooms[2].id } },
            relation: 'Family Of The Bride'
          }
        ]
      }
    }
  });

  const williamAndShona = await prisma.GuestParty.create({
    data: {
      partyName: 'William & Shona',
      token: 'williamAndShona',
      guestType: 'OnSite',
      inviteCode: '0pag',
      accommodationCost: 30000,
      cabin: {
        connect: { id: benLawers.id }
      },
      guests: {
        create: [
          {
            firstName: 'William',
            lastName: '',
            room: { connect: { id: benLawers.rooms[1].id } },
            relation: 'Family Of The Bride'
          },
          {
            firstName: 'Shona',
            lastName: '',
            room: { connect: { id: benLawers.rooms[1].id } },
            relation: 'Family Of The Bride'
          },
          {
            firstName: 'Luca',
            lastName: '',
            isChild: true,
            relation: 'Family Of The Bride',
            room: { connect: { id: benLawers.rooms[2].id } }
          },
          {
            firstName: 'Holly',
            lastName: '',
            isChild: true,
            relation: 'Family Of The Bride',
            room: { connect: { id: benLawers.rooms[2].id } }
          }
        ]
      }
    }
  });

  const kennyAndUna = await prisma.GuestParty.create({
    data: {
      partyName: 'Kenny & Una',
      token: 'kennyAndUna',
      guestType: 'OnSite',
      inviteCode: 'c57x',
      accommodationCost: 22000,
      cabin: {
        connect: { id: cottage.id }
      },
      guests: {
        create: [
          {
            firstName: 'Kenny',
            lastName: '',
            room: { connect: { id: cottage.rooms[0].id } },
            relation: 'Friend Of The Couple'
          },
          {
            firstName: 'Una',
            lastName: '',
            room: { connect: { id: cottage.rooms[0].id } },
            relation: 'Friend Of The Couple'
          }
        ]
      }
    }
  });

  const una = await prisma.GuestParty.create({
    data: {
      partyName: 'Una',
      token: 'una',
      guestType: 'OnSite',
      inviteCode: 'q4mg',
      accommodationCost: 11000,
      cabin: {
        connect: { id: cottage.id }
      },
      guests: {
        create: [
          {
            firstName: 'Una',
            lastName: '',
            room: { connect: { id: cottage.rooms[0].id } },
            relation: 'Friend Of The Couple'
          },
        ]
      }
    }
  });

  const steveAndLinda = await prisma.GuestParty.create({
    data: {
      partyName: 'Steve & Linda',
      token: 'steveAndLinda',
      guestType: 'OnSite',
      inviteCode: 'z61b',
      accommodationCost: 26000,
      cabin: {
        connect: { id: cottage.id }
      },
      guests: {
        create: [
          {
            firstName: 'Steve',
            lastName: 'Morgan',
            room: { connect: { id: cottage.rooms[1].id } },
            relation: 'Family Of The Groom'
          },
          {
            firstName: 'Linda',
            lastName: 'Morgan',
            room: { connect: { id: cottage.rooms[1].id } },
            relation: 'Family Of The Groom'
          }
        ]
      }
    }
  });

  const kevin = await prisma.GuestParty.create({
    data: {
      partyName: 'Kevin',
      token: 'kevin',
      guestType: 'OnSite',
      inviteCode: 'q92x',
      accommodationCost: 11000,
      cabin: {
        connect: { id: cottage.id }
      },
      guests: {
        create: [
          {
            firstName: 'Kevin',
            lastName: '',
            room: { connect: { id: cottage.rooms[2].id } },
             relation: 'Friend Of The Couple'
          },
        ]
      }
    }
  });

  const rhys = await prisma.GuestParty.create({
    data: {
      partyName: 'Rhys',
      token: 'rhys',
      guestType: 'OnSite',
      inviteCode: 'f6z2',
      accommodationCost: 11000,
      cabin: {
        connect: { id: cottage.id }
      },
      guests: {
        create: [
          {
            firstName: 'Rhys',
            lastName: '',
            room: { connect: { id: cottage.rooms[2].id } },
             relation: 'Friend Of The Couple'
          },
        ]
      }
    }
  });

  const bazAndMary = await prisma.GuestParty.create({
    data: {
      partyName: 'Baz & Mary',
      token: 'bazAndMary',
      guestType: 'OtherAccommodation',
      inviteCode: 'm93h',
      guests: {
        create: [
          {
            firstName: 'Baz',
            lastName: '',
          },
          {
            firstName: 'Mary',
            lastName: 'Whitnall',
          },
        ]
      }
    }
  });

  const sarah = await prisma.GuestParty.create({
    data: {
      partyName: 'Sarah',
      token: 'sarah',
      guestType: 'OtherAccommodation',
      inviteCode: 'e5u8',
      guests: {
        create: [
          {
            firstName: 'Sarah',
            lastName: 'Whitnall',
          },
        ]
      }
    }
  });

  const jamieAndTabitha = await prisma.GuestParty.create({
    data: {
      partyName: 'Jamie & Tabitha',
      token: 'jamieAndTabitha',
      guestType: 'OtherAccommodation',
      inviteCode: 'rtv4',
      guests: {
        create: [
          {
            firstName: 'Jamie',
            lastName: 'Russell',
          },
          {
            firstName: 'Tabitha',
            lastName: 'Russell',
          },
        ]
      }
    }
  });

  const ianAndSylvia = await prisma.GuestParty.create({
    data: {
      partyName: 'Ian & Sylvia',
      token: 'ianAndSylvia',
      guestType: 'OtherAccommodation',
      inviteCode: 'wvt5',
      guests: {
        create: [
          {
            firstName: 'Ian',
            lastName: '',
          },
          {
            firstName: 'Sylvia',
            lastName: '',
          },
        ]
      }
    }
  });

  const partnerAndMaxine = await prisma.GuestParty.create({
    data: {
      partyName: 'Partner & Maxine',
      token: 'partnerAndMaxine',
      guestType: 'OtherAccommodation',
      inviteCode: 'lsy7',
      guests: {
        create: [
          {
            firstName: 'Partner',
            lastName: '',
          },
          {
            firstName: 'Maxine',
            lastName: '',
          },
        ]
      }
    }
  });

  const paulAndAnne = await prisma.GuestParty.create({
    data: {
      partyName: 'Paul & Anne',
      token: 'paulAndAnne',
      guestType: 'OtherAccommodation',
      inviteCode: '5xt8',
      guests: {
        create: [
          {
            firstName: 'Paul',
            lastName: '',
          },
          {
            firstName: 'Anne',
            lastName: '',
          },
        ]
      }
    }
  });

  const nigelAndDebra = await prisma.GuestParty.create({
    data: {
      partyName: 'Nigel & Debra',
      token: 'nigelAndDebra',
      guestType: 'OtherAccommodation',
      inviteCode: 'q492',
      guests: {
        create: [
          {
            firstName: 'Nigel',
            lastName: 'Ledward',
          },
          {
            firstName: 'Debra',
            lastName: 'Ledward-Fox',
          },
        ]
      }
    }
  });

  const stuartAndDebbie = await prisma.GuestParty.create({
    data: {
      partyName: 'Stuart & Debbie',
      token: 'stuartAndDebbie',
      guestType: 'OtherAccommodation',
      inviteCode: 'qzx5',
      guests: {
        create: [
          {
            firstName: 'Stuart',
            lastName: 'Rankin',
          },
          {
            firstName: 'Debbie',
            lastName: 'Rankin',
          },
        ]
      }
    }
  });

  console.log('🌱 Seeded GuestParties and IndividualGuests');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });