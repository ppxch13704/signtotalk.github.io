const textContainer = document.getElementById('text-container');
let hideTimeout;

// *** สำคัญมาก: เปลี่ยน 'your-unique-topic-name-12345' เป็นชื่อเฉพาะของคุณ ***
// *** แนะนำให้ใช้ชื่อที่เดายาก เช่น sign-translator-ตามด้วยชื่อช่องของคุณ-และเลขสุ่ม ***
const NTFY_TOPIC = 'sign-to-talk-jump-th-hacks';

function showText(message) {
    if (message) {
        textContainer.textContent = message;
        textContainer.style.opacity = 1;

        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            textContainer.style.opacity = 0;
        }, 5000); // ซ่อนหลังจาก 5 วินาที
    }
}

function subscribeToUpdates() {
    console.log('Subscribing to topic:', NTFY_TOPIC);
    // ใช้ EventSource เพื่อเชื่อมต่อกับ ntfy.sh แบบ real-time
    const eventSource = new EventSource(`https://ntfy.sh/${NTFY_TOPIC}/sse`);

    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received message:', data.message);
        showText(data.message);
    };

    eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        // ลองเชื่อมต่อใหม่หลังจาก 5 วินาที
        setTimeout(subscribeToUpdates, 5000);
    };
}

// เริ่มการเชื่อมต่อ
subscribeToUpdates();