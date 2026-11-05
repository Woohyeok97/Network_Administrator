import type { Exam, Question } from '@/lib/exam';

const PRIVATE_IP_RANGES = `사설 A 클래스: 10.0.0.0 ~ 10.255.255.255
사설 B 클래스: 172.16.0.0 ~ 172.31.255.255
사설 C 클래스: 192.168.0.0 ~ 192.168.255.255`;

const ICMP_TYPES = `0: 에코 응답(Echo Reply)
3: 목적지 도달 불가능(Destination Unreachable)
4: 발신 제한(Source Quench)
5: 라우트 변경(Redirect)
8: 에코 요구(Echo Request)
11: 시간 초과(Time Exceeded)`;

const RAID_1_ACCEPTED = ['RAID 1', 'RAID-1', 'RAID 1 (미러링)', '미러링'];
const RAID_1_PROMPT =
  'RAID의 구성에서 미러링 모드 구성이라고도 하며 디스크에 있는 모든 데이터는 동시에 다른 디스크에도 백업되어 하나의 디스크가 손상되어도 다른 디스크의 데이터를 사용할 수 있게 한 RAID 구성은?';
const RAID_1_EXPLANATION =
  'RAID 1은 같은 데이터를 두 디스크에 동시에 기록합니다. 한 디스크가 고장 나도 복구할 수 있지만 사용 가능한 용량은 절반이 됩니다.';

const RIP_PROMPT =
  'Distance Vector를 사용하며 최대 지원 가능한 홉 수가 15개이고 업데이트 주기는 30초인 라우팅 프로토콜은 무엇인가?';
const RIP_EXPLANATION =
  'RIP는 거리 벡터 방식의 라우팅 프로토콜로, 홉 수를 기준으로 경로를 선택합니다. 최대 15홉까지 지원하고 30초마다 라우팅 정보를 갱신합니다.';

const OSPF_PROMPT =
  'Link State를 사용하며 라우터 자신을 네트워크의 중심에 두고 최단 경로를 도출해 내는 라우팅 프로토콜은?';
const OSPF_EXPLANATION =
  'OSPF는 링크 상태 라우팅 프로토콜로, 다익스트라(SPF) 알고리즘을 사용해 자신을 기준으로 최단 경로를 계산합니다.';

const NETSTAT_PROMPT =
  '라우팅 테이블, 네트워크 인터페이스 또는 네트워크 연결을 보여주는 리눅스 명령어는 무엇인가?';
const NETSTAT_EXPLANATION =
  'netstat은 네트워크 연결 상태, 라우팅 테이블(-r), 인터페이스 통계(-i) 등을 보여주는 명령어입니다.';

const TRACEROUTE_PROMPT =
  '명령어를 실행하는 컴퓨터에서 목적지 서버로 가는 네트워크 경로를 확인해 주는 리눅스 명령어는?';
const TRACEROUTE_EXPLANATION =
  'traceroute는 목적지까지 거치는 라우터를 차례로 보여줍니다. Windows에서는 같은 역할을 tracert가 합니다.';

const NAT_PROMPT =
  'IP 주소의 낭비를 막기 위해 모든 호스트에 공인 IP 주소를 설정하는 대신, 내부적으로 사설 IP를 설정하며 인터넷에 접속할 때에만 공인 IP로 변환하는 기술은 무엇인가?';
const NAT_ACCEPTED = ['NAT', 'Network Address Translation', '네트워크 주소 변환'];
const NAT_EXPLANATION =
  'NAT는 사설 IP와 공인 IP를 서로 변환해, 적은 수의 공인 IP로 여러 호스트가 인터넷을 사용할 수 있게 합니다.';

const VPN_PROMPT =
  '인터넷망과 같은 공중망을 사용하여 둘 이상의 네트워크를 안전하게 연결하기 위해서 가상의 터널을 만든 후 데이터를 전송할 수 있는 네트워크는?';
const VPN_ACCEPTED = ['VPN', 'Virtual Private Network', '가상사설망'];
const VPN_EXPLANATION =
  'VPN은 공중망 위에 암호화된 가상 터널을 만들어 전용선처럼 사용하는 기술입니다.';

const VLAN_PROMPT =
  "'스위칭'이라는 LAN 기술을 기반으로 가상이라는 개념을 도입하여 네트워크 구성에 대한 지리적 제한을 최소화하면서 사용자가 원하는 최대한의 논리적인 네트워크를 구성할 수 있도록 수단을 제공하는 기술은 무엇인가?";
const VLAN_ACCEPTED = ['VLAN', 'Virtual LAN', '가상 LAN'];
const VLAN_EXPLANATION =
  'VLAN은 물리적 위치와 관계없이 스위치 포트를 논리적으로 묶어 브로드캐스트 영역을 나누는 기술입니다.';

const WAF_PROMPT =
  '웹 서비스와 주고받는 HTTP 트래픽을 필터링, 모니터링 및 차단하는 특정 형태의 애플리케이션 방화벽은 무엇인가?';
const WAF_ACCEPTED = [
  '웹 방화벽(WAF)',
  '웹 방화벽',
  'WAF',
  'Web Application Firewall'
];
const WAF_EXPLANATION =
  '웹 방화벽(WAF)은 HTTP 요청을 검사해 SQL 인젝션, XSS 같은 웹 공격을 차단합니다.';

const SSH_EXPLANATION =
  'SSH는 암호화된 원격 접속 프로토콜입니다. Telnet과 달리 통신 내용이 암호화되며, 기본 포트는 22번입니다.';

const PASSWD_PROMPT =
  '기본적으로 패스워드를 부여하거나 패스워드를 변경하는 리눅스 명령어는?';
const PASSWD_EXPLANATION =
  'passwd는 사용자 계정의 비밀번호를 설정하거나 변경하는 명령어입니다.';

const NETWORK_SERVICES_PROMPT = `각 설명에 맞는 것을 고르시오.
(A) 사설 IP를 공인 IP로 변경에 필요한 주소 변환 서비스
(B) 네트워크에 연결된 장치에 IP 주소를 자동으로 할당하기 위해 사용되는 네트워크 관리 프로토콜
(C) 네트워크 트래픽을 모니터링하고 제어하는 네트워크 보안 시스템
(D) 공중망을 사용하여 둘 이상의 네트워크를 안전하게 연결하기 위해 가상의 터널을 만든 후 데이터를 전송할 수 있는 네트워크`;
const NETWORK_SERVICES_OPTIONS = ['DHCP', 'Firewall', 'NAT', 'VPN'];
const NETWORK_SERVICES_BLANKS = [
  { label: '(A)', accepted: ['NAT'] },
  { label: '(B)', accepted: ['DHCP'] },
  { label: '(C)', accepted: ['Firewall'] },
  { label: '(D)', accepted: ['VPN'] }
];
const NETWORK_SERVICES_EXPLANATION =
  'NAT는 주소 변환, DHCP는 IP 자동 할당, 방화벽(Firewall)은 트래픽 제어, VPN은 공중망 위의 가상 터널을 담당합니다.';

const LINUX_BOOT_PROMPT = `A, B, C 각각의 설명에 맞는 것을 적으시오.
(A) GNU 하에 개발된 리눅스 부트로더
(B) 리눅스 커널 부팅이 완료된 뒤 실행되는 첫 번째 프로세스. 또한 커널이 직접 실행하는 유일한 프로세스
(C) 부팅 시 자동으로 마운트 되도록 설정해야 하는 파일`;
const LINUX_BOOT_BLANKS = [
  { label: '(A)', accepted: ['grub', 'grub2'] },
  { label: '(B)', accepted: ['init'] },
  { label: '(C)', accepted: ['/etc/fstab', 'fstab'] }
];
const LINUX_BOOT_EXPLANATION =
  'grub은 부트로더, init은 PID 1번의 첫 프로세스, /etc/fstab은 부팅 시 마운트할 파일 시스템 목록입니다.';

const SECURE_WEB_BLANKS = [
  { label: '(A)', accepted: ['SSL', 'TLS', 'SSL/TLS'] },
  { label: '(B)', accepted: ['HTTPS'] }
];
const SECURE_WEB_EXPLANATION =
  'SSL(TLS)은 데이터를 암호화하는 보안 프로토콜이고, HTTPS는 SSL/TLS 위에서 동작하는 HTTP입니다.';

const PRIVATE_IP_OPTIONS = [
  '192.168.100.0',
  '224.24.194.18',
  '10.14.36.100',
  '172.30.200.36'
];

const TCP_FEATURE_OPTIONS = [
  '연결성',
  '비연결성',
  '신뢰성',
  '송신과 수신이 다르다.',
  '송신과 수신이 동일하다.'
];
const TCP_FEATURE_ANSWERS = ['연결성', '신뢰성', '송신과 수신이 동일하다.'];
const TCP_FEATURE_EXPLANATION =
  'TCP는 연결 지향적이고 신뢰성이 있으며, 3-way handshake로 연결하고 ACK와 슬라이딩 윈도우로 전송을 제어합니다. UDP보다는 느립니다.';

const createExam = (
  year: number,
  round: number,
  questions: Question[]
): Exam => ({
  id: `${year}-${round}`,
  title: `${year}년 ${round}회`,
  year,
  questions
});

export const examYears = [2022, 2021, 2020, 2019];

export const exams: Exam[] = [
  createExam(2022, 3, [
    {
      type: 'short',
      prompt:
        '인터넷상에 전용회선과 같이 이용이 가능한 가상의 전용회선을 만들어서 데이터를 도청하는 등의 행위를 방지하기 위한 통신규약이다. AH와 ESP 등 2개의 프로토콜로 구성되어 있다.',
      accepted: ['IPSec', 'IP Security'],
      explanation:
        'IPSec은 네트워크 계층에서 IP 패킷을 보호하는 프로토콜입니다. AH는 인증과 무결성을, ESP는 여기에 암호화까지 제공합니다.'
    },
    {
      type: 'short',
      prompt: NAT_PROMPT,
      accepted: NAT_ACCEPTED,
      explanation: NAT_EXPLANATION
    },
    {
      type: 'short',
      prompt:
        '리눅스 시스템의 CPU 사용량, 우선순위 등을 실시간으로 전반적인 상황을 모니터링하거나 프로세스 관리를 할 수 있는 유틸리티이다.',
      accepted: ['top'],
      explanation:
        'top은 프로세스의 CPU·메모리 사용량과 우선순위를 실시간으로 보여주는 명령어입니다.'
    },
    {
      type: 'short',
      prompt: RAID_1_PROMPT,
      accepted: RAID_1_ACCEPTED,
      explanation: RAID_1_EXPLANATION
    },
    {
      type: 'multiple',
      prompt: 'IPv6의 특징으로 옳은 것을 모두 고르시오.',
      options: [
        '64비트로 이루어져 있다.',
        '확장 헤더 옵션이 있다.',
        '유니캐스트-멀티캐스트-애니캐스트',
        '유니캐스트-멀티캐스트-브로드캐스트',
        '이동성이 좋아졌다.',
        '보안성이 좋아졌다.'
      ],
      answers: [
        '확장 헤더 옵션이 있다.',
        '유니캐스트-멀티캐스트-애니캐스트',
        '이동성이 좋아졌다.',
        '보안성이 좋아졌다.'
      ],
      explanation:
        'IPv6는 128비트 주소를 사용하고 브로드캐스트가 없습니다. 확장 헤더를 지원하며 이동성과 보안성이 향상되었습니다.'
    },
    {
      type: 'short',
      prompt: '네트워크 ID를 구하시오.\nIP: 170.10.50.2\n서브넷 마스크: 255.255.224.0',
      accepted: ['170.10.32.0'],
      explanation: `170으로 시작하므로 B 클래스입니다.
마스크의 세 번째 옥텟이 224이므로 256 - 224 = 32씩 나뉩니다.

첫 번째 범위: 170.10.0.0 ~ 170.10.31.255
두 번째 범위: 170.10.32.0 ~ 170.10.63.255

세 번째 옥텟 50은 두 번째 범위에 속하므로, 범위의 첫 주소인 170.10.32.0이 네트워크 ID입니다.`
    }
  ]),
  createExam(2022, 2, [
    {
      type: 'short',
      prompt:
        '대표적인 링크 상태 라우팅 프로토콜로 라우터 자신을 네트워크의 중심에 두고 최단 경로를 도출해 내는 프로토콜은?',
      accepted: ['OSPF'],
      explanation: OSPF_EXPLANATION
    },
    {
      type: 'blanks',
      prompt:
        'ping을 정상적으로 사용할 수 있도록 (A)를 채우시오.\n# echo (A) > /proc/sys/net/ipv4/icmp_echo_ignore_all',
      blanks: [{ label: '(A)', accepted: ['0'] }],
      explanation:
        'icmp_echo_ignore_all 값이 0이면 ping에 응답하고, 1이면 ping을 무시합니다.'
    },
    {
      type: 'short',
      prompt: NETSTAT_PROMPT,
      accepted: ['netstat'],
      explanation: NETSTAT_EXPLANATION
    },
    {
      type: 'blanks',
      prompt: `IPSec의 프로토콜 구조에 맞는 것을 적으시오.
(A) IP 패킷에 대한 인증을 제공하고 데이터의 무결성을 보장하는 프로토콜 헤더
(B) IP 패킷에 대한 인증과 암호화를 실시하고 데이터의 무결성과 기밀성을 보장하는 프로토콜 헤더
(C) IPSec 서비스를 구현할 때 암호화 및 인증에 사용할 요소를 정의하는 것`,
      blanks: [
        { label: '(A)', accepted: ['AH'] },
        { label: '(B)', accepted: ['ESP'] },
        { label: '(C)', accepted: ['SA'] }
      ],
      explanation:
        'AH는 인증과 무결성, ESP는 인증·무결성·기밀성(암호화)을 제공합니다. SA(Security Association)는 통신에 사용할 보안 요소를 정의합니다.'
    },
    {
      type: 'list',
      prompt: '네트워크 계층에 포함되는 프로토콜 종류를 3가지 적으시오.',
      count: 3,
      accepted: ['ICMP', 'IGMP', 'ARP', 'RARP'],
      explanation:
        'ICMP는 오류 보고, IGMP는 멀티캐스트 그룹 관리, ARP는 IP를 MAC 주소로 변환, RARP는 MAC 주소를 IP로 변환합니다.'
    }
  ]),
  createExam(2022, 1, [
    {
      type: 'short',
      prompt: RIP_PROMPT,
      accepted: ['RIP'],
      explanation: RIP_EXPLANATION
    },
    {
      type: 'list',
      prompt: 'TCP/IP 계층에서 전송계층에 속하는 프로토콜을 두 가지 적으시오.',
      count: 2,
      accepted: ['TCP', 'UDP'],
      explanation:
        '전송계층 프로토콜은 TCP와 UDP입니다. TCP는 연결 지향적이고 신뢰성이 있으며, UDP는 비연결형으로 더 빠릅니다.'
    },
    {
      type: 'short',
      prompt: '패스워드를 설정하는 리눅스 명령어는 무엇인가?',
      accepted: ['passwd'],
      explanation: PASSWD_EXPLANATION
    },
    {
      type: 'short',
      prompt: WAF_PROMPT,
      accepted: WAF_ACCEPTED,
      explanation: WAF_EXPLANATION
    },
    {
      type: 'blanks',
      isRestored: true,
      prompt: `다음 ICMP 메시지의 Type 번호를 적으시오.
(A) Echo Reply
(B) Destination Unreachable
(C) Echo Request
(D) Time Exceeded`,
      blanks: [
        { label: '(A)', accepted: ['0'] },
        { label: '(B)', accepted: ['3'] },
        { label: '(C)', accepted: ['8'] },
        { label: '(D)', accepted: ['11'] }
      ],
      explanation: ICMP_TYPES
    },
    {
      type: 'blanks',
      prompt: LINUX_BOOT_PROMPT,
      blanks: LINUX_BOOT_BLANKS,
      explanation: LINUX_BOOT_EXPLANATION
    }
  ]),
  createExam(2021, 4, [
    {
      type: 'blanks',
      prompt: `A와 B 각각의 설명에 맞는 프로토콜을 적으시오.
(A) Distance Vector를 사용하며 최대 지원 가능한 홉 수가 15개이고 업데이트 주기는 30초인 라우팅 프로토콜
(B) Link State를 사용하며 라우터 자신을 네트워크의 중심에 두고 최단 경로를 도출해 내는 라우팅 프로토콜`,
      blanks: [
        { label: '(A)', accepted: ['RIP'] },
        { label: '(B)', accepted: ['OSPF'] }
      ],
      explanation: `${RIP_EXPLANATION}\n${OSPF_EXPLANATION}`
    },
    {
      type: 'short',
      prompt: PASSWD_PROMPT,
      accepted: ['passwd'],
      explanation: PASSWD_EXPLANATION
    },
    {
      type: 'short',
      prompt: VLAN_PROMPT,
      accepted: VLAN_ACCEPTED,
      explanation: VLAN_EXPLANATION
    },
    {
      type: 'multiple',
      isRestored: true,
      prompt: 'TCP의 특징으로 알맞은 것을 모두 고르시오.',
      options: TCP_FEATURE_OPTIONS,
      answers: TCP_FEATURE_ANSWERS,
      explanation: TCP_FEATURE_EXPLANATION
    },
    {
      type: 'blanks',
      prompt: NETWORK_SERVICES_PROMPT,
      options: NETWORK_SERVICES_OPTIONS,
      blanks: NETWORK_SERVICES_BLANKS,
      explanation: NETWORK_SERVICES_EXPLANATION
    }
  ]),
  createExam(2021, 3, [
    {
      type: 'blanks',
      prompt: `A와 B 각각의 설명에 맞는 것을 적으시오.
(A) 브라우저 사이에 전송되는 데이터를 암호화하여 인터넷 연결을 보호하기 위한 기술
(B) 인증서를 기반으로 암호화된 데이터를 전송하는 프로토콜`,
      blanks: SECURE_WEB_BLANKS,
      explanation: SECURE_WEB_EXPLANATION
    },
    {
      type: 'short',
      prompt: OSPF_PROMPT,
      accepted: ['OSPF'],
      explanation: OSPF_EXPLANATION
    },
    {
      type: 'short',
      prompt: TRACEROUTE_PROMPT,
      accepted: ['traceroute'],
      explanation: TRACEROUTE_EXPLANATION
    },
    {
      type: 'single',
      isRestored: true,
      prompt: 'C 클래스 사설 IP인 것을 고르시오.',
      options: PRIVATE_IP_OPTIONS,
      answer: '192.168.100.0',
      explanation: PRIVATE_IP_RANGES
    },
    {
      type: 'short',
      prompt: RAID_1_PROMPT,
      accepted: RAID_1_ACCEPTED,
      explanation: RAID_1_EXPLANATION
    }
  ]),
  createExam(2021, 2, [
    {
      type: 'short',
      prompt:
        '네트워크 접속, 라우팅 테이블, 네트워크 인터페이스의 통계 정보를 보여주는 도구는?',
      accepted: ['netstat'],
      explanation: NETSTAT_EXPLANATION
    },
    {
      type: 'short',
      prompt: `${VPN_PROMPT}\n터널링 시 IPSec, L2TP, PPTP 등의 프로토콜을 사용하기도 한다.`,
      accepted: VPN_ACCEPTED,
      explanation: `VPN에서 사용되는 2계층 프로토콜: L2F, L2TP, PPTP
VPN에서 사용되는 3계층 프로토콜: IPSec
SSL VPN은 그보다 상위 계층에서 동작합니다.`
    },
    {
      type: 'multiple',
      isRestored: true,
      prompt: 'IPv6에 관한 특징으로 알맞은 것들을 모두 고르시오.',
      options: [
        '주소 길이가 128비트이다.',
        '주소 길이가 64비트이다.',
        '확장 헤더로 이동성이 향상되었다.',
        '보안 서비스가 향상되었다.',
        '헤더가 단순화되었다.',
        '유니캐스트, 멀티캐스트, 애니캐스트를 사용한다.',
        '유니캐스트, 멀티캐스트, 브로드캐스트를 사용한다.'
      ],
      answers: [
        '주소 길이가 128비트이다.',
        '확장 헤더로 이동성이 향상되었다.',
        '보안 서비스가 향상되었다.',
        '헤더가 단순화되었다.',
        '유니캐스트, 멀티캐스트, 애니캐스트를 사용한다.'
      ],
      explanation:
        'IPv6는 128비트 주소를 쓰고 헤더가 단순해졌습니다. 이동성과 보안이 향상되었고, 브로드캐스트 대신 애니캐스트를 사용합니다.'
    },
    {
      type: 'multiple',
      isRestored: true,
      prompt: '전송계층에서 쓰는 프로토콜을 모두 고르시오.',
      options: ['TCP', 'UDP', 'ARP', 'ICMP', 'HTTP', 'SMTP'],
      answers: ['TCP', 'UDP'],
      explanation:
        'TCP와 UDP가 전송계층입니다. ARP와 ICMP는 인터넷 계층, HTTP와 SMTP는 응용 계층입니다.'
    },
    {
      type: 'single',
      prompt: '다음 중 사설 B 클래스 주소로 유효한 것을 고르시오.',
      options: PRIVATE_IP_OPTIONS,
      answer: '172.30.200.36',
      explanation: PRIVATE_IP_RANGES
    }
  ]),
  createExam(2021, 1, [
    {
      type: 'short',
      prompt: RIP_PROMPT,
      accepted: ['RIP'],
      explanation: RIP_EXPLANATION
    },
    {
      type: 'short',
      prompt: WAF_PROMPT,
      accepted: WAF_ACCEPTED,
      explanation: WAF_EXPLANATION
    },
    {
      type: 'short',
      prompt: '사설 IP를 공인 IP로 변경에 필요한 주소 변환 서비스는 무엇인가?',
      accepted: NAT_ACCEPTED,
      explanation: NAT_EXPLANATION
    },
    {
      type: 'short',
      prompt: '현재 작업 중인 디렉터리의 이름을 출력하는 리눅스 명령어는 무엇인가?',
      accepted: ['pwd'],
      explanation: 'pwd는 print working directory의 줄임말입니다.'
    },
    {
      type: 'single',
      prompt: '사설 A 클래스 주소인 것을 고르시오.',
      options: PRIVATE_IP_OPTIONS,
      answer: '10.14.36.100',
      explanation: PRIVATE_IP_RANGES
    },
    {
      type: 'blanks',
      prompt: LINUX_BOOT_PROMPT.replace('적으시오', '고르시오'),
      options: ['/etc/fstab', 'grub', 'init'],
      blanks: [
        { label: '(A)', accepted: ['grub'] },
        { label: '(B)', accepted: ['init'] },
        { label: '(C)', accepted: ['/etc/fstab'] }
      ],
      explanation: LINUX_BOOT_EXPLANATION
    }
  ]),
  createExam(2020, 4, [
    {
      type: 'short',
      prompt:
        '네트워크 상의 다른 컴퓨터에 로그인하거나 원격 시스템에서 명령을 실행하고 다른 시스템으로 파일을 복사할 수 있도록 해 주는 응용 프로그램 또는 프로토콜로 Telnet과 같은 프로토콜은 무엇인가?',
      accepted: ['SSH', 'Secure Shell'],
      explanation: SSH_EXPLANATION
    },
    {
      type: 'short',
      prompt: VPN_PROMPT,
      accepted: VPN_ACCEPTED,
      explanation: VPN_EXPLANATION
    },
    {
      type: 'short',
      prompt: NETSTAT_PROMPT,
      accepted: ['netstat'],
      explanation: NETSTAT_EXPLANATION
    },
    {
      type: 'single',
      prompt: '다음 중 ICMP Type 3번의 Message는 무엇인가?',
      options: [
        'Redirect',
        'Destination Unreachable',
        'Echo Request',
        'Time Exceeded'
      ],
      answer: 'Destination Unreachable',
      explanation: ICMP_TYPES
    },
    {
      type: 'single',
      prompt: '사설 C 클래스 주소인 것을 고르시오.',
      options: PRIVATE_IP_OPTIONS,
      answer: '192.168.100.0',
      explanation: PRIVATE_IP_RANGES
    },
    {
      type: 'short',
      prompt: RAID_1_PROMPT,
      accepted: RAID_1_ACCEPTED,
      explanation: RAID_1_EXPLANATION
    }
  ]),
  createExam(2020, 3, [
    {
      type: 'short',
      prompt: TRACEROUTE_PROMPT,
      accepted: ['traceroute'],
      explanation: TRACEROUTE_EXPLANATION
    },
    {
      type: 'short',
      prompt:
        'VTP는 연결된 스위치들끼리 정보를 주고받아 자동으로 동기화하게 해주는 프로토콜인데, VTP에서 V의 의미는 무엇인가?',
      accepted: ['VLAN'],
      explanation:
        'VTP는 VLAN Trunking Protocol의 줄임말로, 스위치 간에 VLAN 정보를 동기화합니다.'
    },
    {
      type: 'short',
      prompt:
        '대표적인 링크 상태 라우팅 프로토콜로 라우터 자신을 네트워크의 중심에 두고 최단 경로를 도출해 내는 프로토콜은?',
      accepted: ['OSPF'],
      explanation: OSPF_EXPLANATION
    },
    {
      type: 'blanks',
      prompt:
        '외부 ping 차단을 해제하도록 (A)를 채우시오.\necho (A) > icmp_echo_ignore_all',
      blanks: [{ label: '(A)', accepted: ['0'] }],
      explanation: '0: 외부 ping 허용\n1: 외부 ping 차단'
    },
    {
      type: 'list',
      prompt: 'TCP/IP 4계층에서 인터넷 계층 프로토콜을 3가지 적으시오.',
      count: 3,
      accepted: ['ARP', 'ICMP', 'IGMP', 'RARP'],
      explanation:
        '인터넷 계층에는 ARP, RARP, ICMP, IGMP가 속합니다. 원문 답은 ARP, ICMP, IGMP이며, 같은 계층인 RARP도 정답으로 인정합니다.'
    },
    {
      type: 'multiple',
      isRestored: true,
      prompt: 'IPv6의 특징을 모두 고르시오.',
      options: [
        '주소 길이가 128bit이다.',
        '주소 길이가 32bit이다.',
        '8개의 16비트 필드로 구성된다.',
        '4개의 8비트 필드로 구성된다.',
        '각 필드는 콜론으로 연결된다.',
        '각 필드는 점으로 연결된다.'
      ],
      answers: [
        '주소 길이가 128bit이다.',
        '8개의 16비트 필드로 구성된다.',
        '각 필드는 콜론으로 연결된다.'
      ],
      explanation:
        'IPv6는 16비트 필드 8개, 총 128비트로 구성되고 각 필드를 콜론(:)으로 구분합니다. 32비트와 점 표기는 IPv4의 특징입니다.'
    }
  ]),
  createExam(2020, 2, [
    {
      type: 'blanks',
      prompt: `A와 B 각각의 설명에 맞는 프로토콜을 적으시오.
(A) 브라우저 사이에 전송되는 데이터를 암호화하여 인터넷 연결을 보호하기 위한 기술
(B) 웹사이트가 SSL/TLS 인증서로 보호되는 HTTP 통신을 하는 프로토콜`,
      blanks: SECURE_WEB_BLANKS,
      explanation: SECURE_WEB_EXPLANATION
    },
    {
      type: 'short',
      prompt:
        '리눅스에서 사용자는 파일에 모든 권한을 가지고 그룹 및 다른 사용자에게는 읽기, 실행 권한만을 부여하도록 접근 권한을 설정하는 명령어를 적으시오.',
      accepted: [
        'chmod 755 [파일 이름]',
        'chmod 755',
        'chmod 755 파일이름',
        'chmod 755 file'
      ],
      explanation:
        '읽기 4, 쓰기 2, 실행 1을 더합니다. 소유자는 7(rwx), 그룹과 기타 사용자는 5(r-x)이므로 755입니다.'
    },
    {
      type: 'short',
      prompt:
        '패킷이 라우팅 되는 경로의 추적에 사용되는 유틸리티로 목적지 경로까지 각 경유지의 응답속도를 확인할 수 있는 것은?',
      accepted: ['tracert', 'traceroute'],
      explanation: 'tracert는 ICMP 기반이고, traceroute는 UDP 기반입니다.'
    },
    {
      type: 'short',
      prompt: '192.xxx.xx.xxx/26의 서브 네트워크 수를 구하시오.',
      accepted: ['4', '4개'],
      explanation:
        '/26의 서브넷 마스크는 255.255.255.192입니다. C 클래스 기본 24비트에서 2비트를 빌렸으므로 서브넷은 2² = 4개이고, 서브넷당 주소는 64개입니다.'
    },
    {
      type: 'single',
      prompt: 'C 클래스에서 유효한 사설 IP 주소는 무엇인가?',
      options: [
        '33.114.17.24',
        '128.46.83.25',
        '192.168.13.87',
        '222.248.255.34'
      ],
      answer: '192.168.13.87',
      explanation: PRIVATE_IP_RANGES
    },
    {
      type: 'blanks',
      prompt: NETWORK_SERVICES_PROMPT,
      options: NETWORK_SERVICES_OPTIONS,
      blanks: NETWORK_SERVICES_BLANKS,
      explanation: NETWORK_SERVICES_EXPLANATION
    }
  ]),
  createExam(2019, 4, [
    {
      type: 'short',
      prompt: RIP_PROMPT,
      accepted: ['RIP'],
      explanation: RIP_EXPLANATION
    },
    {
      type: 'short',
      prompt:
        '네트워크 상 다른 컴퓨터에 접속하거나 원격으로 네트워크에 접근할 때 시스템 간의 파일을 복사해서 동기화시켜주는 응용 프로토콜은 무엇인가?',
      accepted: ['SSH', 'Secure Shell'],
      explanation: SSH_EXPLANATION
    },
    {
      type: 'short',
      prompt:
        '리눅스에서 주어진 명령어의 매뉴얼(도움말, 옵션 등)을 출력하기 위해 사용되는 명령어는?',
      accepted: ['man'],
      explanation: 'man은 manual의 줄임말로, `man ls`처럼 사용합니다.'
    },
    {
      type: 'multiple',
      prompt: 'TCP의 특징으로 알맞은 것들을 모두 고르시오.',
      options: TCP_FEATURE_OPTIONS,
      answers: TCP_FEATURE_ANSWERS,
      explanation: TCP_FEATURE_EXPLANATION
    },
    {
      type: 'short',
      prompt: '192.168.100.150/25의 네트워크 ID를 구하시오.',
      accepted: ['192.168.100.128'],
      explanation: `192로 시작하므로 C 클래스이고, /25이므로 서브넷은 2개입니다.

첫 번째 범위: 192.168.100.0 ~ 192.168.100.127
두 번째 범위: 192.168.100.128 ~ 192.168.100.255

마지막 옥텟 150은 두 번째 범위에 속하므로, 범위의 첫 주소인 192.168.100.128이 네트워크 ID입니다.`
    },
    {
      type: 'short',
      prompt: RAID_1_PROMPT,
      accepted: RAID_1_ACCEPTED,
      explanation: RAID_1_EXPLANATION
    }
  ]),
  createExam(2019, 3, [
    {
      type: 'short',
      prompt: '172.168.200.100/18의 네트워크 ID를 구하시오.',
      accepted: ['172.168.192.0'],
      explanation: `172로 시작하므로 B 클래스입니다.
/18의 서브넷 마스크는 255.255.192.0이고, 세 번째 옥텟이 64씩 4개로 나뉩니다.

첫 번째 범위: 172.168.0.0 ~ 172.168.63.255
두 번째 범위: 172.168.64.0 ~ 172.168.127.255
세 번째 범위: 172.168.128.0 ~ 172.168.191.255
네 번째 범위: 172.168.192.0 ~ 172.168.255.255

세 번째 옥텟 200은 네 번째 범위에 속하므로, 범위의 첫 주소인 172.168.192.0이 네트워크 ID입니다.`
    },
    {
      type: 'short',
      prompt:
        'OSI 7계층에서 코드화, 암호화, 복호화, 압축, 인증을 수행하는 계층은 무엇인가?',
      accepted: ['표현 계층', '표현', '프레젠테이션 계층', 'Presentation'],
      explanation:
        '표현 계층(6계층)은 데이터의 형식 변환, 암호화, 압축을 담당합니다.'
    },
    {
      type: 'short',
      prompt: '리눅스에서 가장 우선순위가 높은 프로세스를 보여주는 명령어는 무엇인가?',
      accepted: ['top'],
      explanation:
        'top은 프로세스의 CPU·메모리 사용량과 우선순위를 실시간으로 보여주는 명령어입니다.'
    },
    {
      type: 'short',
      prompt: NAT_PROMPT,
      accepted: NAT_ACCEPTED,
      explanation: NAT_EXPLANATION
    },
    {
      type: 'short',
      prompt:
        '인터넷 그룹 관리 프로토콜로 컴퓨터가 멀티캐스트 그룹을 인근의 라우터들에게 알리는 수단을 제공하는 인터넷 프로토콜은?',
      accepted: ['IGMP', 'Internet Group Management Protocol'],
      explanation:
        'IGMP는 호스트가 멀티캐스트 그룹에 가입하거나 탈퇴할 때 라우터에 알리는 프로토콜입니다.'
    },
    {
      type: 'single',
      prompt: '사설 A 클래스 주소로 유효한 것은 무엇인가?',
      options: [
        '192.100.2.134',
        '10.172.192.24',
        '172.18.244.100',
        '224.45.67.129'
      ],
      answer: '10.172.192.24',
      explanation: PRIVATE_IP_RANGES
    }
  ]),
  createExam(2019, 2, [
    {
      type: 'short',
      prompt: VLAN_PROMPT,
      accepted: VLAN_ACCEPTED,
      explanation: VLAN_EXPLANATION
    },
    {
      type: 'short',
      prompt: NETSTAT_PROMPT,
      accepted: ['netstat'],
      explanation: NETSTAT_EXPLANATION
    },
    {
      type: 'short',
      prompt:
        'init은 리눅스 기본 프로세스이다. 시스템을 종료하기 위한 init의 옵션은 무엇인가?',
      accepted: ['0', 'init 0'],
      explanation: 'init 0은 시스템 종료, init 6은 재부팅입니다.'
    },
    {
      type: 'short',
      prompt: '172.50.48.6 / 255.255.224.0의 네트워크 ID를 구하시오.',
      accepted: ['172.50.32.0'],
      explanation: `172로 시작하므로 B 클래스입니다.
마스크가 255.255.224.0이므로 세 번째 옥텟이 32씩 나뉩니다.

첫 번째 범위: 172.50.0.0 ~ 172.50.31.255
두 번째 범위: 172.50.32.0 ~ 172.50.63.255

세 번째 옥텟 48은 두 번째 범위에 속하므로, 네트워크 ID는 172.50.32.0입니다.`
    },
    {
      type: 'multiple',
      prompt: '다음 중 IPv6에 대한 설명으로 옳은 것을 모두 고르시오.',
      options: [
        '주소 크기가 64비트이다.',
        '헤더 확장으로 이동성이 좋아졌다.',
        '유니캐스트, 애니캐스트, 멀티캐스트',
        '유니캐스트, 브로드캐스트, 멀티캐스트',
        '브로드캐스트',
        '보안성이 좋아졌다.'
      ],
      answers: [
        '헤더 확장으로 이동성이 좋아졌다.',
        '유니캐스트, 애니캐스트, 멀티캐스트',
        '보안성이 좋아졌다.'
      ],
      explanation:
        'IPv6는 128비트 주소를 사용하고 브로드캐스트가 없습니다. 확장 헤더를 지원하며 이동성과 보안성이 향상되었습니다.'
    },
    {
      type: 'multiple',
      prompt: 'TCP/IP 4계층에서 인터넷 계층인 프로토콜을 모두 고르시오.',
      options: ['ARP', 'SMTP', 'TCP', 'IGMP', 'ICMP', 'HTTP'],
      answers: ['ARP', 'IGMP', 'ICMP'],
      explanation:
        'ARP, IGMP, ICMP는 인터넷 계층입니다. TCP는 전송 계층, SMTP와 HTTP는 응용 계층입니다.'
    }
  ])
];

export const frequentExam: Exam = {
  id: 'frequent',
  title: '빈출 문제',
  questions: [
    {
      type: 'multiple',
      isRestored: true,
      prompt: 'TCP/IP 4계층 중 인터넷 계층에 속하는 프로토콜을 모두 고르시오.',
      options: ['ARP', 'RARP', 'IGMP', 'ICMP', 'TCP', 'SMTP', 'DNS'],
      answers: ['ARP', 'RARP', 'IGMP', 'ICMP'],
      explanation: `네트워크 액세스 계층: 리피터, 허브, FDDI, HDLC, ISDN, ATM, WIFI
인터넷 계층: ARP, RARP, IGMP, ICMP
전송 계층: TCP, UDP
응용 계층: SMTP, SNMP, HTTP, POP3, FTP, DHCP, DNS, Telnet`
    },
    {
      type: 'short',
      prompt: '172.168.102.5/19의 네트워크 ID를 구하시오.',
      accepted: ['172.168.96.0'],
      explanation: `서브넷 마스크는 255.255.224.0이고, 256 - 224 = 32이므로 세 번째 옥텟이 32씩 나뉩니다.

172.168.0.0 ~ 172.168.31.255
172.168.32.0 ~ 172.168.63.255
172.168.64.0 ~ 172.168.95.255
172.168.96.0 ~ 172.168.127.255

102는 마지막 범위에 속하므로 범위의 첫 주소인 172.168.96.0이 네트워크 ID입니다.`
    },
    {
      type: 'short',
      prompt:
        '인터넷망과 같은 공중망을 사설망처럼 이용해 회선 비용을 크게 절감할 수 있는 기업통신 서비스는?',
      accepted: VPN_ACCEPTED,
      explanation: VPN_EXPLANATION
    },
    {
      type: 'blanks',
      isRestored: true,
      prompt: `IPv4와 IPv6의 주소 길이를 비트 수로 적으시오.
(A) IPv4
(B) IPv6`,
      blanks: [
        { label: '(A)', accepted: ['32', '32비트', '32bit'] },
        { label: '(B)', accepted: ['128', '128비트', '128bit'] }
      ],
      explanation: `IPv4: 8비트 × 4개 = 32비트, 10진수 표기, 유니캐스트·멀티캐스트·브로드캐스트
IPv6: 16비트 × 8개 = 128비트, 16진수 표기, 유니캐스트·멀티캐스트·애니캐스트`
    },
    {
      type: 'blanks',
      isRestored: true,
      prompt: `각 설명에 맞는 시스템을 고르시오.
(A) 침입을 탐지하는 시스템
(B) 탐지뿐만 아니라 탐지된 공격을 차단하는 시스템`,
      options: ['IDS', 'IPS'],
      blanks: [
        { label: '(A)', accepted: ['IDS'] },
        { label: '(B)', accepted: ['IPS'] }
      ],
      explanation: `IDS(침입 탐지 시스템)는 오용 탐지와 비정상 탐지 기법을 사용합니다.
오용 탐지: 알려진 공격 패턴을 찾으며, 새로운 침입 유형은 탐지할 수 없습니다.
비정상 탐지: 정상 행위를 정의하고 벗어나는 행동을 찾으며, 새로운 침입 유형도 탐지할 수 있습니다.
IPS(침입 방지 시스템)는 탐지에 더해 공격을 차단합니다.`
    },
    {
      type: 'short',
      prompt:
        '네트워크 스위치의 어떤 포트에서 보이는 모든 네트워크 패킷이나 전체 VLAN의 패킷들을 다른 모니터링 포트로 복제하는 데에 사용되는 것은?',
      accepted: ['포트 미러링', 'Port Mirroring', '미러링'],
      explanation:
        '포트 미러링은 특정 포트의 트래픽을 분석 장비가 연결된 포트로 복제하는 기능입니다.'
    },
    {
      type: 'blanks',
      isRestored: true,
      prompt: `각 장치가 동작하는 계층을 고르시오.
(A) 허브, 리피터
(B) 스위치, 브리지
(C) 라우터`,
      options: ['데이터링크 계층', '물리 계층', '인터넷 계층'],
      blanks: [
        { label: '(A)', accepted: ['물리 계층'] },
        { label: '(B)', accepted: ['데이터링크 계층'] },
        { label: '(C)', accepted: ['인터넷 계층'] }
      ],
      explanation: `물리 계층: 허브, 리피터
데이터링크 계층: 스위치, 브리지
인터넷 계층: 라우터
그 외 계층: 게이트웨이`
    },
    {
      type: 'short',
      prompt:
        'IP 주소를 물리적 네트워크 주소인 MAC 주소로 대응시키기 위해 사용되는 프로토콜은?',
      accepted: ['ARP', 'Address Resolution Protocol'],
      explanation:
        'ARP는 IP 주소로 MAC 주소를 찾습니다. 반대로 MAC 주소로 IP 주소를 찾는 프로토콜은 RARP입니다.'
    },
    {
      type: 'short',
      prompt: NAT_PROMPT,
      accepted: NAT_ACCEPTED,
      explanation: NAT_EXPLANATION
    },
    {
      type: 'short',
      prompt:
        '2개 이상의 다른 혹은 같은 종류의 통신망을 상호 접속하여 통신망 간 정보를 주고받을 수 있게 하는 기능의 단위나 장치는?',
      accepted: ['게이트웨이', 'Gateway'],
      explanation:
        '게이트웨이는 서로 다른 네트워크를 연결하고 필요한 경우 프로토콜을 변환하는 장치입니다.'
    },
    {
      type: 'single',
      isRestored: true,
      prompt: '다음 중 사설 B 클래스 주소인 것을 고르시오.',
      options: ['10.0.0.1', '172.20.1.1', '172.32.1.1', '192.169.1.1'],
      answer: '172.20.1.1',
      explanation: PRIVATE_IP_RANGES
    },
    {
      type: 'short',
      prompt:
        '데이터링크 계층 중 MAC 계층에서 일하며 두 세그먼트 사이에서 데이터링크 계층 간의 패킷 전송을 담당하는 장치는?',
      accepted: ['브리지', 'Bridge'],
      explanation:
        '브리지는 MAC 주소를 기준으로 두 세그먼트 사이에서 프레임을 전달하는 장치입니다.'
    },
    {
      type: 'single',
      prompt: 'RFID와 관계가 없는 것은?',
      options: ['RFID 리더기', '태그', '안테나', 'Access Point'],
      answer: 'Access Point',
      explanation:
        'RFID는 리더기, 태그, 안테나로 구성됩니다. Access Point는 무선 LAN 장비입니다.'
    },
    {
      type: 'short',
      prompt:
        '매니지먼트와 에이전트 사이에 관리 정보를 주고받기 위한 프로토콜이며 정보교환 단위는 메시지이다. 이 프로토콜은?',
      accepted: ['SNMP', 'Simple Network Management Protocol'],
      explanation:
        'SNMP는 네트워크 장비의 상태를 관리자(매니저)와 에이전트가 주고받는 관리 프로토콜입니다.'
    },
    {
      type: 'short',
      prompt:
        'TCP/IP 기반 네트워크상에서 서버나 라우터가 에러나 예상치 못한 사건들을 보고할 목적으로 만들어진 프로토콜은?',
      accepted: ['ICMP', 'Internet Control Message Protocol'],
      explanation: `ICMP는 오류와 제어 메시지를 전달하며, ping이 이 프로토콜을 사용합니다.\n\n${ICMP_TYPES}`
    },
    {
      type: 'short',
      prompt:
        '동적 디스크 볼륨 중 볼륨 자체에서 하나의 디스크가 손상되었을 경우, 다른 하드디스크의 데이터로 손상된 부분을 복구할 수 있는 내결함성을 지원하는 볼륨은?',
      accepted: ['미러링', '미러 볼륨', 'Mirroring', 'RAID 1'],
      explanation:
        '미러 볼륨은 데이터를 두 디스크에 똑같이 기록하므로 한쪽이 손상되어도 복구할 수 있습니다.'
    },
    {
      type: 'blanks',
      prompt: `(A)와 (B)는 무엇인가?
(A) 임의로 구성된 웹사이트에서 눈속임을 통해 이용자의 정보를 빼가는 해킹 수법의 하나이다.
(B) 네트워크 상의 다른 컴퓨터에 로그인하거나 원격 시스템에서 명령을 실행하고 다른 시스템으로 파일을 복사할 수 있게 해주는 응용프로그램이다.`,
      blanks: [
        { label: '(A)', accepted: ['스푸핑', 'Spoofing', '피싱', 'Phishing'] },
        { label: '(B)', accepted: ['SSH', 'Secure Shell'] }
      ],
      explanation:
        '원문 답은 스푸핑입니다. 설명이 피싱과도 맞아서 피싱도 정답으로 인정합니다. SSH는 암호화된 원격 접속 프로토콜입니다.'
    },
    {
      type: 'short',
      prompt: `무슨 클래스에 대한 설명인가?
IP 주소의 처음 1개 비트가 항상 0이다.
할당 가능한 네트워크의 수는 2^7개이다.
할당 가능한 호스트의 수는 2^24개이다.`,
      accepted: ['A class', 'A 클래스', 'class A', 'A'],
      explanation:
        'A 클래스는 첫 비트가 0이고 네트워크 부분이 8비트입니다. B 클래스는 10, C 클래스는 110으로 시작합니다.'
    },
    {
      type: 'short',
      prompt:
        '네트워크에서 공격 서명을 찾아내서 자동으로 조치를 취함으로써 비정상적인 트래픽을 중단시키는 보안 솔루션은?',
      accepted: ['IPS', 'Intrusion Prevention System', '침입 방지 시스템'],
      explanation: 'IPS는 공격을 탐지하는 데 그치지 않고 트래픽을 자동으로 차단합니다.'
    },
    {
      type: 'short',
      prompt: '이미 발견되어 있는 공격 패턴을 미리 입력하고, 해당하는 패턴을 탐지하는 기법은?',
      accepted: ['오용 탐지 기법', '오용 탐지', 'Misuse Detection'],
      explanation:
        '오용 탐지는 알려진 공격 패턴과 비교하므로 오탐이 적지만 새로운 공격은 찾지 못합니다.'
    }
  ]
};

export function findExam(examId: string) {
  if (examId === frequentExam.id) return frequentExam;
  return exams.find(exam => exam.id === examId);
}
