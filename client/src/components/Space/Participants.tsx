import { BsFillStarFill } from 'react-icons/bs';
import { Participant } from '.';

const PARTICIPANTS = [
  {
    id: 1,
    fullName: 'Ammamaria Lyles',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/utpariaturfugit.png?size=50x50&amp;set=set1',
  },
  {
    id: 2,
    fullName: 'Chiquita Lightbourne',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/molestiasdeseruntfugiat.png?size=50x50&amp;set=set1',
  },
  {
    id: 3,
    fullName: 'Sergeant Caudelier',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/nobiseligendinatus.png?size=50x50&amp;set=set1',
  },
  {
    id: 4,
    fullName: 'Zaccaria Gathwaite',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/etcommodiaut.png?size=50x50&amp;set=set1',
  },
  {
    id: 5,
    fullName: 'Clayborne Tompkinson',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/utassumendaquibusdam.png?size=50x50&amp;set=set1',
  },
  {
    id: 6,
    fullName: 'Shanan Large',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/estexvoluptatem.png?size=50x50&amp;set=set1',
  },
  {
    id: 7,
    fullName: 'Veronika Sprigg',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/solutaautrepellendus.png?size=50x50&amp;set=set1',
  },
  {
    id: 8,
    fullName: 'Judith Scad',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/ducimusvoluptatemquas.png?size=50x50&amp;set=set1',
  },
  {
    id: 9,
    fullName: 'Xymenes Balazot',
    isSpeaker: false,
    isHost: true,
    isGuest: false,
    avatar: 'https://robohash.org/etteneturtemporibus.png?size=50x50&amp;set=set1',
  },
  {
    id: 10,
    fullName: "Mignon L'Hommee",
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/istequiquis.png?size=50x50&amp;set=set1',
  },
  {
    id: 11,
    fullName: 'Dorolisa Loveridge',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/sapienteipsamillo.png?size=50x50&amp;set=set1',
  },
  {
    id: 12,
    fullName: 'Benedicto Odhams',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/exercitationemestqui.png?size=50x50&amp;set=set1',
  },
  {
    id: 13,
    fullName: 'Hugues McCarly',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/providentlaboriosameaque.png?size=50x50&amp;set=set1',
  },
  {
    id: 14,
    fullName: 'Damiano Jerzycowski',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/commodihicquia.png?size=50x50&amp;set=set1',
  },
  {
    id: 15,
    fullName: 'Julietta Sancho',
    isSpeaker: false,
    avatar: 'https://robohash.org/etquaerataliquam.png?size=50x50&amp;set=set1',
  },
  {
    id: 16,
    fullName: 'Rhonda Wartonby',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/aliquamautexplicabo.png?size=50x50&amp;set=set1',
  },
  {
    id: 17,
    fullName: 'Barrie Zealander',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/beataedoloreset.png?size=50x50&amp;set=set1',
  },
  {
    id: 18,
    fullName: 'Randall Aiton',
    isSpeaker: true,
    isHost: false,
    isGuest: true,
    avatar: 'https://robohash.org/atqueperferendiseveniet.png?size=50x50&amp;set=set1',
  },
  {
    id: 19,
    fullName: 'Verina Sisnett',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/sapienteaperiameum.png?size=50x50&amp;set=set1',
  },
  {
    id: 20,
    fullName: 'Nealson Morrad',
    isHost: true,
    avatar: 'https://robohash.org/estfacereaut.png?size=50x50&amp;set=set1',
  },
  {
    id: 21,
    fullName: 'Cissy Nutman',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/doloribusnamest.png?size=50x50&amp;set=set1',
  },
  {
    id: 22,
    fullName: 'Manny Yearnes',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/consecteturvitaecommodi.png?size=50x50&amp;set=set1',
  },
  {
    id: 23,
    fullName: 'Justinn Parminter',
    isSpeaker: false,
    isHost: true,
    isGuest: true,
    avatar: 'https://robohash.org/nisiutassumenda.png?size=50x50&amp;set=set1',
  },
  {
    id: 24,
    fullName: 'Emmery Priden',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/aliquidenimeveniet.png?size=50x50&amp;set=set1',
  },
  {
    id: 25,
    fullName: 'Danice Husset',
    isHost: false,
    avatar: 'https://robohash.org/quiaperiamnostrum.png?size=50x50&amp;set=set1',
  },
  {
    id: 26,
    fullName: 'Dani Tofanelli',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/quiidet.png?size=50x50&amp;set=set1',
  },
  {
    id: 27,
    fullName: 'Datha Riditch',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/ettemporibusdoloremque.png?size=50x50&amp;set=set1',
  },
  {
    id: 28,
    fullName: 'Carmelita Press',
    isSpeaker: true,
    isHost: false,
    isGuest: false,
    avatar: 'https://robohash.org/istesitlaudantium.png?size=50x50&amp;set=set1',
  },
  {
    id: 29,
    fullName: 'Pru Mayzes',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/voluptatesverosuscipit.png?size=50x50&amp;set=set1',
  },
  {
    id: 30,
    fullName: 'Celina Ranson',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/nequedeseruntaccusantium.png?size=50x50&amp;set=set1',
  },
  {
    id: 31,
    fullName: 'Randene Houliston',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/pariaturautemconsequuntur.png?size=50x50&amp;set=set1',
  },
  {
    id: 32,
    fullName: 'Ferdinande Shewsmith',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/architectooditdistinctio.png?size=50x50&amp;set=set1',
  },
  {
    id: 33,
    fullName: 'Berrie Noury',
    isSpeaker: true,
    isHost: false,
    isGuest: true,
    avatar: 'https://robohash.org/undeetadipisci.png?size=50x50&amp;set=set1',
  },
  {
    id: 34,
    fullName: 'Rheta Asipenko',
    isHost: false,
    avatar: 'https://robohash.org/quidemtemporaenim.png?size=50x50&amp;set=set1',
  },
  {
    id: 35,
    fullName: 'Cecilio Bartlomiejczyk',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/quidemetsed.png?size=50x50&amp;set=set1',
  },
  {
    id: 36,
    fullName: 'Anthony Steggles',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/minimadelenitifacilis.png?size=50x50&amp;set=set1',
  },
  {
    id: 37,
    fullName: 'Antoni Haill',
    isHost: false,
    avatar: 'https://robohash.org/teneturfacerevoluptatem.png?size=50x50&amp;set=set1',
  },
  {
    id: 38,
    fullName: 'Othelia Worman',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/consequuntureumpossimus.png?size=50x50&amp;set=set1',
  },
  {
    id: 39,
    fullName: 'Olivette Greaterex',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/providentquieos.png?size=50x50&amp;set=set1',
  },
  {
    id: 40,
    fullName: "Cammy O'Rodane",
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/quisquoscorrupti.png?size=50x50&amp;set=set1',
  },
  {
    id: 41,
    fullName: 'Aggi Lowy',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/itaqueaspernaturut.png?size=50x50&amp;set=set1',
  },
  {
    id: 42,
    fullName: 'Vale Joliffe',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/nonomnisfugit.png?size=50x50&amp;set=set1',
  },
  {
    id: 43,
    fullName: 'Shirlene Figure',
    isHost: true,
    avatar: 'https://robohash.org/assumendaabdelectus.png?size=50x50&amp;set=set1',
  },
  {
    id: 44,
    fullName: 'Nicolle Sealey',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/dolorsuntdebitis.png?size=50x50&amp;set=set1',
  },
  {
    id: 45,
    fullName: 'Berkly MacArte',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/doloremcommodiet.png?size=50x50&amp;set=set1',
  },
  {
    id: 46,
    fullName: 'Waneta Meyer',
    isHost: false,
    avatar: 'https://robohash.org/doloremerrorid.png?size=50x50&amp;set=set1',
  },
  {
    id: 47,
    fullName: 'Nickolai Gerin',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/magnamdolorut.png?size=50x50&amp;set=set1',
  },
  {
    id: 48,
    fullName: 'Babbie Threlfall',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/quosinfacilis.png?size=50x50&amp;set=set1',
  },
  {
    id: 49,
    fullName: 'Lorena Foxten',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/sitomnisvoluptas.png?size=50x50&amp;set=set1',
  },
  {
    id: 50,
    fullName: 'Kirsten Ruoff',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/facilisetut.png?size=50x50&amp;set=set1',
  },
  {
    id: 51,
    fullName: 'Hirsch Rump',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/rerumipsavero.png?size=50x50&amp;set=set1',
  },
  {
    id: 52,
    fullName: "Brunhilde D'Errico",
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/sapientererumaut.png?size=50x50&amp;set=set1',
  },
  {
    id: 53,
    fullName: 'Cullin Kiddye',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/natustemporibusnemo.png?size=50x50&amp;set=set1',
  },
  {
    id: 54,
    fullName: 'Bernadette Brokenbrow',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/numquameosofficia.png?size=50x50&amp;set=set1',
  },
  {
    id: 55,
    fullName: 'Irving Garmey',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/quiaperiamhic.png?size=50x50&amp;set=set1',
  },
  {
    id: 56,
    fullName: 'Regan Quincey',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/asperioresnonet.png?size=50x50&amp;set=set1',
  },
  {
    id: 57,
    fullName: 'York De Stoop',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/aliquidhicnostrum.png?size=50x50&amp;set=set1',
  },
  {
    id: 58,
    fullName: 'Aubrey Lockton',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/voluptatequisquamreiciendis.png?size=50x50&amp;set=set1',
  },
  {
    id: 59,
    fullName: 'Almeria Barense',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/idomniseligendi.png?size=50x50&amp;set=set1',
  },
  {
    id: 60,
    fullName: 'Waylen Bloss',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/atculpafuga.png?size=50x50&amp;set=set1',
  },
  {
    id: 61,
    fullName: 'Dan Cockill',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/autodioanimi.png?size=50x50&amp;set=set1',
  },
  {
    id: 62,
    fullName: 'Janifer Garcia',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/dignissimostemporibusvoluptatem.png?size=50x50&amp;set=set1',
  },
  {
    id: 63,
    fullName: 'Jordan Teather',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/molestiasetnobis.png?size=50x50&amp;set=set1',
  },
  {
    id: 64,
    fullName: 'Adham Iiannoni',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/saepehiccorrupti.png?size=50x50&amp;set=set1',
  },
  {
    id: 65,
    fullName: 'Gerry Cavy',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/iddistinctiovel.png?size=50x50&amp;set=set1',
  },
  {
    id: 66,
    fullName: 'Adina Vaillant',
    isSpeaker: true,
    isHost: false,
    isGuest: true,
    avatar: 'https://robohash.org/teneturomnisvero.png?size=50x50&amp;set=set1',
  },
  {
    id: 67,
    fullName: 'Zilvia Mackiewicz',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/porroreprehenderitconsectetur.png?size=50x50&amp;set=set1',
  },
  {
    id: 68,
    fullName: 'Emory Roulston',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/facerenammollitia.png?size=50x50&amp;set=set1',
  },
  {
    id: 69,
    fullName: 'Matthias Jocelyn',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/rerummodisint.png?size=50x50&amp;set=set1',
  },
  {
    id: 70,
    fullName: 'Heddi Bluschke',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/idnonaccusamus.png?size=50x50&amp;set=set1',
  },
  {
    id: 71,
    fullName: 'Hannis Delafoy',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/occaecatiquiasint.png?size=50x50&amp;set=set1',
  },
  {
    id: 72,
    fullName: 'Lacey Bryde',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/etaliquammollitia.png?size=50x50&amp;set=set1',
  },
  {
    id: 73,
    fullName: 'Vilma Wycherley',
    isHost: false,
    avatar: 'https://robohash.org/doloribusoccaecatiad.png?size=50x50&amp;set=set1',
  },
  {
    id: 74,
    fullName: 'Cesare Quantrell',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/asperioresquiaea.png?size=50x50&amp;set=set1',
  },
  {
    id: 75,
    fullName: 'Melonie Antill',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/pariatursedomnis.png?size=50x50&amp;set=set1',
  },
  {
    id: 76,
    fullName: 'Randa Frankema',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/veniamconsequaturmagnam.png?size=50x50&amp;set=set1',
  },
  {
    id: 77,
    fullName: 'Filmore McNally',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/cumquedoloremquedolores.png?size=50x50&amp;set=set1',
  },
  {
    id: 78,
    fullName: 'Cordy Birtwhistle',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/velitprovidentvoluptatum.png?size=50x50&amp;set=set1',
  },
  {
    id: 79,
    fullName: 'Addie Roden',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/molestiassequiet.png?size=50x50&amp;set=set1',
  },
  {
    id: 80,
    fullName: 'Valerie Royal',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/voluptatemplaceatqui.png?size=50x50&amp;set=set1',
  },
  {
    id: 81,
    fullName: 'Rebekkah Swinerd',
    isHost: false,
    avatar: 'https://robohash.org/etidin.png?size=50x50&amp;set=set1',
  },
  {
    id: 82,
    fullName: 'Vevay Calladine',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/perspiciatisetipsa.png?size=50x50&amp;set=set1',
  },
  {
    id: 83,
    fullName: 'Yuma Chiverton',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/autfacerenesciunt.png?size=50x50&amp;set=set1',
  },
  {
    id: 84,
    fullName: 'Hildegarde Palfreeman',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/veritatisautemeum.png?size=50x50&amp;set=set1',
  },
  {
    id: 85,
    fullName: 'Verina Cruft',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/solutadoloremsunt.png?size=50x50&amp;set=set1',
  },
  {
    id: 86,
    fullName: 'Lavina Szymoni',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/magnamiureerror.png?size=50x50&amp;set=set1',
  },
  {
    id: 87,
    fullName: 'Kathy Dennick',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/nonutimpedit.png?size=50x50&amp;set=set1',
  },
  {
    id: 88,
    fullName: 'Abran Goulter',
    isHost: true,
    avatar: 'https://robohash.org/saepeconsequatursed.png?size=50x50&amp;set=set1',
  },
  {
    id: 89,
    fullName: 'Ryley Standidge',
    isHost: false,
    avatar: 'https://robohash.org/magnidoloremeaque.png?size=50x50&amp;set=set1',
  },
  {
    id: 90,
    fullName: 'Shermy Withull',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/aperiamvoluptatibusquos.png?size=50x50&amp;set=set1',
  },
  {
    id: 91,
    fullName: 'Raf Nussgen',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/temporeaspernaturbeatae.png?size=50x50&amp;set=set1',
  },
  {
    id: 92,
    fullName: 'Coralie Riddock',
    isSpeaker: false,
    isHost: true,
    avatar: 'https://robohash.org/quiquostotam.png?size=50x50&amp;set=set1',
  },
  {
    id: 93,
    fullName: 'Darb Thurlborn',
    isHost: true,
    avatar: 'https://robohash.org/etautdistinctio.png?size=50x50&amp;set=set1',
  },
  {
    id: 94,
    fullName: 'Brocky Tuxsell',
    isHost: false,
    avatar: 'https://robohash.org/repellatdoloribuset.png?size=50x50&amp;set=set1',
  },
  {
    id: 95,
    fullName: 'Janenna Olekhov',
    isSpeaker: false,
    isHost: false,
    avatar: 'https://robohash.org/inlaboriosamdicta.png?size=50x50&amp;set=set1',
  },
  {
    id: 96,
    fullName: 'Bernadine Danher',
    isHost: false,
    avatar: 'https://robohash.org/quivoluptatumea.png?size=50x50&amp;set=set1',
  },
  {
    id: 97,
    fullName: 'Jeramie Penketh',
    isSpeaker: true,
    isHost: false,
    avatar: 'https://robohash.org/eanobismollitia.png?size=50x50&amp;set=set1',
  },
  {
    id: 98,
    fullName: 'Lil Hughland',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/suntauttenetur.png?size=50x50&amp;set=set1',
  },
  {
    id: 99,
    fullName: 'Noah Tidridge',
    isSpeaker: true,
    isHost: true,
    avatar: 'https://robohash.org/voluptatemquiipsa.png?size=50x50&amp;set=set1',
  },
  {
    id: 100,
    fullName: 'Rosina Hoyt',
    isHost: true,
    isGuest: true,
    avatar: 'https://robohash.org/quiitaqueharum.png?size=50x50&amp;set=set1',
  },
];

function Participants() {
  return (
    <div className="mt-5 bg-slate-50 dark:bg-slate-900 flex-col py-2 justify-center items-center shadow-md rounded-md grid grid-cols-5 auto-rows-fr text-center self-center gap-1">
      {PARTICIPANTS.map(participant => (
        <Participant
          key={participant.id}
          participant={{ type: 'GUEST', fullName: 'Ali H. Kudeir', id: '', profilePicture: {}, username: '', email: '' }}
        />
      ))}
    </div>
  );
}

export default Participants;
