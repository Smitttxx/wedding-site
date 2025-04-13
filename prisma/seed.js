// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  // cabins 
  const farmhouse = await prisma.Cabin.create({
    data: {
      name: 'Farmhouse',
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double', capacity: 2, enSuite: true },
          { name: 'Room 3', roomType: 'Double', capacity: 2, enSuite: true },
          { name: 'Room 4', roomType: 'Double and Bunk', capacity: 4, enSuite: false },
          { name: 'Room 5', roomType: 'Double and Bunk', capacity: 4, enSuite: false },
          { name: 'Room 6', roomType: 'Double and Bunk', capacity: 4, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const longhouse = await prisma.Cabin.create({
    data: {
      name: 'Longhouse',
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double', capacity: 2, enSuite: false },
          { name: 'Room 2', roomType: 'Double', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Double', capacity: 2, enSuite: false },
          { name: 'Room 4', roomType: 'Double', capacity: 2, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const bencurchan = await prisma.Cabin.create({
    data: {
      name: 'Ben Curchan',
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double', capacity: 2, enSuite: true },
          { name: 'Room 3', roomType: 'Double', capacity: 2, enSuite: false },
          { name: 'Room 4', roomType: 'Double And Bunk', capacity: 3, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const schehallion = await prisma.Cabin.create({
    data: {
      name: 'Schehallion',
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double', capacity: 2, enSuite: false },
          { name: 'Room 2', roomType: 'Double', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Double And Bunk', capacity: 4, enSuite: false },
          { name: 'Room 4', roomType: 'Double', capacity: 2, enSuite: false }
        ]
      }
    },
    include: { rooms: true }
  });

  const bendrummod = await prisma.Cabin.create({
    data: {
      name: 'Ben Drummod',
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Bunk', capacity: 3, enSuite: false }

        ]
      }
    },
    include: { rooms: true }
  });

  const benlawyers = await prisma.Cabin.create({
    data: {
      name: 'Ben Lawyers',
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Bunk', capacity: 4, enSuite: false }

        ]
      }
    },
    include: { rooms: true }
  });

  const cottage = await prisma.Cabin.create({
    data: {
      name: 'Cottage',
      rooms: {
        create: [
          { name: 'Room 1', roomType: 'Double', capacity: 2, enSuite: true },
          { name: 'Room 2', roomType: 'Double', capacity: 2, enSuite: false },
          { name: 'Room 3', roomType: 'Bunk', capacity: 4, enSuite: false }

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
            room: { connect: { id: farmhouse.rooms[0].id } }.connect.id,
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
            room: { connect: { id: farmhouse.rooms[1].id } }
          },
          {
            firstName: 'Becca',
            lastName: 'Roberts',
            room: { connect: { id: farmhouse.rooms[1].id } }
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
            room: { connect: { id: farmhouse.rooms[2].id } }
          },
          {
            firstName: 'Becky',
            lastName: '',
            room: { connect: { id: farmhouse.rooms[2].id } }
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
            room: { connect: { id: farmhouse.rooms[3].id } }
          },
          {
            firstName: 'Toni',
            lastName: 'Abblitt',
            room: { connect: { id: farmhouse.rooms[3].id } }
          },
          {
            firstName: 'Renly',
            lastName: 'Speakman',
            isBaby: true,
            room: { connect: { id: farmhouse.rooms[3].id } }
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
            room: { connect: { id: farmhouse.rooms[3].id } }
          },
          {
            firstName: 'Ellie',
            lastName: 'Van',
            room: { connect: { id: farmhouse.rooms[3].id } }
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
            room: { connect: { id: farmhouse.rooms[4].id } }
          },
          {
            firstName: 'Puja',
            lastName: 'Biswas',
            room: { connect: { id: farmhouse.rooms[4].id } }
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
            room: { connect: { id: farmhouse.rooms[4].id } }
          },
          {
            firstName: 'Kim',
            lastName: '',
            room: { connect: { id: farmhouse.rooms[4].id } }
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
            room: { connect: { id: farmhouse.rooms[5].id } }
          },
          {
            firstName: 'Natasha',
            lastName: '',
            room: { connect: { id: farmhouse.rooms[5].id } }
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
            room: { connect: { id: farmhouse.rooms[5].id } }
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
            room: { connect: { id: longhouse.rooms[0].id } }
          },
          {
            firstName: 'Helen',
            lastName: 'Walters',
            room: { connect: { id: longhouse.rooms[0].id } }
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
            room: { connect: { id: longhouse.rooms[1].id } }
          },
          {
            firstName: 'Anthia',
            lastName: '',
            room: { connect: { id: longhouse.rooms[1].id } }
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
            lastName: '',
            room: { connect: { id: longhouse.rooms[2].id } }
          },
          {
            firstName: 'Ally',
            lastName: '',
            room: { connect: { id: longhouse.rooms[2].id } }
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
            room: { connect: { id: longhouse.rooms[3].id } }
          },
          {
            firstName: 'Cynthia',
            lastName: '',
            room: { connect: { id: longhouse.rooms[3].id } }
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
        connect: { id: bencurchan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Nigel',
            lastName: 'Austin',
            room: { connect: { id: bencurchan.rooms[0].id } }
          },
          {
            firstName: 'Ruth',
            lastName: 'Austin',
            room: { connect: { id: bencurchan.rooms[0].id } }
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
        connect: { id: bencurchan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Mike',
            lastName: 'Austin',
            room: { connect: { id: bencurchan.rooms[1].id } }
          },
          {
            firstName: 'Anne',
            lastName: 'Austin',
            room: { connect: { id: bencurchan.rooms[1].id } }
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
        connect: { id: bencurchan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Mike',
            lastName: 'Downey',
            room: { connect: { id: bencurchan.rooms[2].id } }
          },
          {
            firstName: 'Ellen',
            lastName: 'Downey',
            room: { connect: { id: bencurchan.rooms[2].id } }
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
        connect: { id: bencurchan.id }
      },
      guests: {
        create: [
          {
            firstName: 'David',
            lastName: 'Austin',
            room: { connect: { id: bencurchan.rooms[3].id } }
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
        connect: { id: bencurchan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Steven',
            lastName: 'Austin',
            room: { connect: { id: bencurchan.rooms[3].id } }
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
        connect: { id: bencurchan.id }
      },
      guests: {
        create: [
          {
            firstName: 'Tom',
            lastName: 'Downey',
            room: { connect: { id: bencurchan.rooms[3].id } }
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
        connect: { id: schehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'George',
            lastName: '',
            room: { connect: { id: schehallion.rooms[0].id } }
          },
          {
            firstName: 'Rebecca',
            lastName: '',
            room: { connect: { id: schehallion.rooms[0].id } }
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
        connect: { id: schehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'Eddie',
            lastName: '',
            room: { connect: { id: schehallion.rooms[1].id } }
          },
          {
            firstName: 'Maureen',
            lastName: '',
            room: { connect: { id: schehallion.rooms[1].id } }
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
        connect: { id: schehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'Kevin',
            lastName: '',
            room: { connect: { id: schehallion.rooms[2].id } }
          },
          {
            firstName: 'Lynn',
            lastName: '',
            room: { connect: { id: schehallion.rooms[2].id } }
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
        connect: { id: schehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'Cieran',
            lastName: '',
            room: { connect: { id: schehallion.rooms[2].id } }
          },
          {
            firstName: 'Chloe',
            lastName: '',
            room: { connect: { id: schehallion.rooms[2].id } }
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
        connect: { id: schehallion.id }
      },
      guests: {
        create: [
          {
            firstName: 'John',
            lastName: '',
            room: { connect: { id: schehallion.rooms[3].id } }
          },
          {
            firstName: 'Andrea',
            lastName: '',
            room: { connect: { id: schehallion.rooms[3].id } }
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
        connect: { id: bendrummod.id }
      },
      guests: {
        create: [
          {
            firstName: 'Dougie',
            lastName: 'Smith',
            room: { connect: { id: bendrummod.rooms[0].id } }
          },
          {
            firstName: 'Maria',
            lastName: 'Smith',
            room: { connect: { id: bendrummod.rooms[0].id } }
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
        connect: { id: bendrummod.id }
      },
      guests: {
        create: [
          {
            firstName: 'Ross',
            lastName: 'Mitchall',
            room: { connect: { id: bendrummod.rooms[1].id } }
          },
          {
            firstName: 'Nicci',
            lastName: 'Mitchall',
            room: { connect: { id: bendrummod.rooms[1].id } }
          },
          {
            firstName: 'Jaxson',
            lastName: 'Mitchall',
            isChild: true,
            room: { connect: { id: bendrummod.rooms[2].id } }
          },
          {
            firstName: 'Jenson',
            lastName: 'Mitchall',
            isChild: true,
            room: { connect: { id: bendrummod.rooms[2].id } }
          },
          {
            firstName: 'Skye',
            lastName: 'Mitchall',
            isChild: true,
            room: { connect: { id: bendrummod.rooms[2].id } }
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
        connect: { id: benlawyers.id }
      },
      guests: {
        create: [
          {
            firstName: 'Ryan',
            lastName: '',
            room: { connect: { id: benlawyers.rooms[0].id } }
          },
          {
            firstName: 'Vicky',
            lastName: '',
            room: { connect: { id: benlawyers.rooms[0].id } }
          },
          {
            firstName: 'Mimi-Rose',
            lastName: '',
            isBaby: true,
            room: { connect: { id: benlawyers.rooms[0].id } }
          },
          {
            firstName: 'Milo',
            lastName: '',
            isChild: true,
            room: { connect: { id: benlawyers.rooms[2].id } }
          },
          {
            firstName: 'Macie',
            lastName: '',
            isChild: true,
            room: { connect: { id: benlawyers.rooms[2].id } }
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
        connect: { id: benlawyers.id }
      },
      guests: {
        create: [
          {
            firstName: 'William',
            lastName: '',
            room: { connect: { id: benlawyers.rooms[1].id } }
          },
          {
            firstName: 'Shona',
            lastName: '',
            room: { connect: { id: benlawyers.rooms[1].id } }
          },
          {
            firstName: 'Luca',
            lastName: '',
            isChild: true,
            room: { connect: { id: benlawyers.rooms[2].id } }
          },
          {
            firstName: 'Holly',
            lastName: '',
            isChild: true,
            room: { connect: { id: benlawyers.rooms[2].id } }
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
            room: { connect: { id: cottage.rooms[0].id } }
          },
          {
            firstName: 'Una',
            lastName: '',
            room: { connect: { id: cottage.rooms[0].id } }
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
            room: { connect: { id: cottage.rooms[0].id } }
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
            lastName: '',
            room: { connect: { id: cottage.rooms[1].id } }
          },
          {
            firstName: 'Linda',
            lastName: '',
            room: { connect: { id: cottage.rooms[1].id } }
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
            room: { connect: { id: cottage.rooms[2].id } }
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
            room: { connect: { id: cottage.rooms[2].id } }
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
            lastName: '',
          },
          {
            firstName: 'Debra',
            lastName: '',
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
            lastName: '',
          },
          {
            firstName: 'Debbie',
            lastName: '',
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