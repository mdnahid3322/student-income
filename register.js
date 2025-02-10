// Supabase কানেকশন সেটআপ
const { createClient } = supabase;
const supabaseUrl = "https://yowvpevjeiuwykmswqqt.supabase.co";  
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlvd3ZwZXZqZWl1d3lrbXN3cXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNjU1MTAsImV4cCI6MjA1NDc0MTUxMH0.pDPdrC02MZm6d26GkrRvXcv32R4HYnTQTtZEatxy7YU";

const db = createClient(supabaseUrl, supabaseKey);

// রেজিস্ট্রেশন ফাংশন
document.getElementById("register-form").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Supabase Authentication এর মাধ্যমে ইউজার রেজিস্ট্রেশন
    let { data, error } = await db.auth.signUp({ email, password });

    if (error) {
        alert("Error: " + error.message);
    } else {
        // ডাটাবেসে ইউজারের তথ্য সেভ করা
        await db.from("users").insert([{ id: data.user.id, name, email, balance: 0 }]);
        alert("✅ Registration successful!");
        window.location.href = "login.html";
    }
});
