
import { useState } from "react";

const الخدمات = ["سشوار", "حلاقة", "بروتين", "تنظيف بشرة"];

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      onLogin(true);
    } else {
      alert("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20, textAlign: "center" }}>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10, fontSize: 16 }}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10, fontSize: 16 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10, fontSize: 16 }}>دخول</button>
      </form>
    </div>
  );
}

export default function BarberApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [اسم, setاسم] = useState("");
  const [خدمة, setخدمة] = useState(الخدمات[0]);
  const [السعر, setالسعر] = useState("");
  const [الطلبات, setالطلبات] = useState([]);

  if (!loggedIn) {
    return <Login onLogin={setLoggedIn} />;
  }

  const إرسالطلب = () => {
    if (!اسم || !السعر) return;
    setالطلبات([...الطلبات, { اسم, خدمة, السعر, حالة: "قيد الدفع" }]);
    setاسم("");
    setالسعر("");
  };

  const تحديثحالة = (index) => {
    const جديدة = [...الطلبات];
    جديدة[index].حالة = "تم الدفع";
    setالطلبات(جديدة);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>تطبيق الحلاق</h1>
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="اسم الزبون"
          value={اسم}
          onChange={(e) => setاسم(e.target.value)}
          style={{ width: "100%", padding: 8, fontSize: 16, marginBottom: 10 }}
        />
        <select
          value={خدمة}
          onChange={(e) => setخدمة(e.target.value)}
          style={{ width: "100%", padding: 8, fontSize: 16, marginBottom: 10 }}
        >
          {الخدمات.map((خ, idx) => (
            <option key={idx} value={خ}>{خ}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="السعر بالدينار"
          value={السعر}
          onChange={(e) => setالسعر(e.target.value)}
          style={{ width: "100%", padding: 8, fontSize: 16, marginBottom: 10 }}
        />
        <button onClick={إرسالطلب} style={{ width: "100%", padding: 10, fontSize: 16 }}>
          إرسال للكاشير
        </button>
      </div>

      <h2>قائمة الزبائن</h2>
      {الطلبات.map((طلب, index) => (
        <div key={index} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10, borderRadius: 5 }}>
          <p><strong>الاسم:</strong> {طلب.اسم}</p>
          <p><strong>الخدمة:</strong> {طلب.خدمة}</p>
          <p><strong>السعر:</strong> {طلب.السعر} دنانير</p>
          <p><strong>الحالة:</strong> {طلب.حالة}</p>
          {طلب.حالة === "قيد الدفع" && (
            <button onClick={() => تحديثحالة(index)} style={{ padding: 6, fontSize: 14 }}>
              تم الدفع
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
