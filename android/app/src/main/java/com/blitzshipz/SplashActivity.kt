package com.blitzshipz

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.blitzshipz.R

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        setTheme(R.style.AppTheme) // Use full app theme here
        super.onCreate(savedInstanceState)
        setContentView(R.layout.splash_screen)

        // Delay or immediately go to MainActivity
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}
